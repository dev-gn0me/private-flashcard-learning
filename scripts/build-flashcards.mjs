import fs from "node:fs";
import path from "node:path";
import xlsx from "xlsx";

const importsDir = path.join(process.cwd(), "imports");
const outFile = path.join(process.cwd(), "data", "flashcards.json");

function slugify(text) {
  return text
    .toLowerCase()
    .replaceAll("ä", "ae")
    .replaceAll("ö", "oe")
    .replaceAll("ü", "ue")
    .replaceAll("ß", "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const CATEGORY_RULES = [
  { match: /^(auge|blut|zelle)/i, category: "Biologie" },
  { match: /^(geo|geographie)/i, category: "Geographie" },
  { match: /(weimar|republik|geschichte)/i, category: "Geschichte" }
];

function inferCategory(rawTitle, fileName) {
  const haystack = `${rawTitle} ${fileName}`;
  const found = CATEGORY_RULES.find((rule) => rule.match.test(haystack));
  return found?.category ?? "Sonstiges";
}

if (!fs.existsSync(importsDir)) {
  console.error("Ordner ./imports fehlt. Lege dort deine Excel-Dateien ab.");
  process.exit(1);
}

const files = fs.readdirSync(importsDir).filter((file) => file.endsWith(".xlsx"));
const subjects = [];

for (const file of files) {
  const workbook = xlsx.readFile(path.join(importsDir, file));
  const rawTitle = file.replace(/^Karteikarten_/i, "").replace(/\.xlsx$/i, "").replaceAll("_", " ");
  const subject = {
    id: slugify(rawTitle),
    title: rawTitle,
    sourceFile: file,
    category: inferCategory(rawTitle, file),
    cards: []
  };

  for (const sheetName of workbook.SheetNames) {
    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, defval: null });
    let currentSection = "Allgemein";

    for (const row of rows.slice(1)) {
      const [nr, frage, antwort, bildreferenz] = row;
      if ((nr === null || nr === "") && frage && !antwort) {
        currentSection = String(frage).trim();
        continue;
      }

      if (typeof nr === "number" && frage && antwort) {
        subject.cards.push({
          id: `${subject.id}-${nr}`,
          nr,
          question: String(frage).trim(),
          answer: String(antwort).trim(),
          section: currentSection,
          sheet: sheetName,
          imageRef: bildreferenz ? String(bildreferenz).trim() : null
        });
      }
    }
  }

  subjects.push(subject);
}

fs.writeFileSync(outFile, JSON.stringify({ subjects }, null, 2), "utf8");
console.log(`Fertig. ${subjects.length} Fächer exportiert nach ${outFile}`);

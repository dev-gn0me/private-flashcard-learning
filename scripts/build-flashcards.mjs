import fs from "node:fs";
import path from "node:path";
import xlsx from "xlsx";

const importsDir = path.join(process.cwd(), "imports");
const outFile = path.join(process.cwd(), "data", "flashcards.json");
const mappingFile = path.join(process.cwd(), "config", "subject-mapping.json");

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

function normalizeTitle(rawTitle) {
  return rawTitle.replace(/\s+/g, " ").trim();
}

const CATEGORY_RULES = [
  { match: /^(auge|blut|zelle)/i, category: "Biologie" },
  { match: /^(geo|geographie)/i, category: "Geographie" },
  { match: /(weimar|republik|geschichte)/i, category: "Geschichte" }
];

const mapping = fs.existsSync(mappingFile)
  ? JSON.parse(fs.readFileSync(mappingFile, "utf8"))
  : {};

function inferSubjectConfig(rawTitle, fileName) {
  const normalized = normalizeTitle(rawTitle);
  const mapped = mapping[normalized];
  if (mapped) {
    return {
      title: mapped.title ?? normalized,
      category: mapped.category ?? "Sonstiges"
    };
  }

  const haystack = `${normalized} ${fileName}`;
  const found = CATEGORY_RULES.find((rule) => rule.match.test(haystack));
  return {
    title: normalized,
    category: found?.category ?? "Sonstiges"
  };
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
  const subjectConfig = inferSubjectConfig(rawTitle, file);
  const subject = {
    id: slugify(subjectConfig.title),
    title: subjectConfig.title,
    sourceFile: file,
    category: subjectConfig.category,
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

subjects.sort((a, b) => a.category.localeCompare(b.category, "de") || a.title.localeCompare(b.title, "de"));

fs.writeFileSync(outFile, JSON.stringify({ subjects }, null, 2), "utf8");
console.log(`Fertig. ${subjects.length} Fächer exportiert nach ${outFile}`);

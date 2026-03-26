import Link from "next/link";
import { subjectGroups, subjects } from "@/lib/data";

export default function HomePage() {
  const totalCards = subjects.reduce((sum, subject) => sum + subject.cards.length, 0);

  return (
    <div>
      <section className="heroCard">
        <h1>Deine private Karteikarten-Lernapp</h1>
        <p>
          Mobile-first, schnell auf dem Handy und ideal für Vercel. Aktuell sind {subjects.length} Fächer
          mit insgesamt {totalCards} Karten importiert.
        </p>
      </section>

      {subjectGroups.map((group) => (
        <section className="categorySection" key={group.category}>
          <div className="categoryHeader">
            <h2>{group.category}</h2>
            <span className="pill">{group.subjects.length} Fächer</span>
          </div>

          <div className="subjectGrid">
            {group.subjects.map((subject) => (
              <article className="subjectCard" key={subject.id}>
                <h3>{subject.title}</h3>
                <div className="subjectMeta">{subject.cards.length} Karten</div>
                <div className="subjectMeta">Quelle: {subject.sourceFile}</div>
                <Link className="primaryButton" href={`/subject/${subject.id}`}>
                  Jetzt lernen
                </Link>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

import Link from "next/link";
import { subjects } from "@/lib/data";

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

      <section className="subjectGrid">
        {subjects.map((subject) => (
          <article className="subjectCard" key={subject.id}>
            <h2>{subject.title}</h2>
            <div className="subjectMeta">{subject.cards.length} Karten</div>
            <div className="subjectMeta">Quelle: {subject.sourceFile}</div>
            <Link className="primaryButton" href={`/subject/${subject.id}`}>
              Jetzt lernen
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { subjectGroups, subjects } from "@/lib/data";

export default function HomePage() {
  const totalCards = subjects.reduce((sum, subject) => sum + subject.cards.length, 0);

  return (
    <div>
      <section className="heroCard compactHero">
        <div>
          <h1>Deine Lernapp</h1>
          <p>
            {subjects.length} Unterthemen, {totalCards} Karten. Wähle ein Fach und starte entweder alles
            zusammen oder nur ein einzelnes Unterthema.
          </p>
        </div>
        <div className="heroActions">
          <Link className="ghostButton" href="/lernhilfe">Lernhilfe</Link>
        </div>
      </section>

      <div className="accordionList">
        {subjectGroups.map((group) => (
          <details className="categoryAccordion" key={group.id}>
            <summary className="categorySummary">
              <div>
                <h2>{group.category}</h2>
                <p>{group.subjects.length} Unterthemen · {group.cards.length} Karten</p>
              </div>
              <div className="summaryActions" onClick={(event) => event.stopPropagation()}>
                <Link className="primaryButton" href={`/study/fach-${group.id}`}>
                  ▶ Fach lernen
                </Link>
              </div>
            </summary>

            <div className="subtopicList">
              {group.subjects.map((subject) => (
                <article className="subtopicRow" key={subject.id}>
                  <div>
                    <h3>{subject.title}</h3>
                    <p>{subject.cards.length} Karten</p>
                  </div>
                  <Link className="ghostButton" href={`/study/thema-${subject.id}`}>
                    ▶ Thema lernen
                  </Link>
                </article>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

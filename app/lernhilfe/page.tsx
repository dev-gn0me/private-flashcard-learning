import { guideSections } from "@/lib/guide";

export default function LernhilfePage() {
  return (
    <div>
      <section className="heroCard">
        <h1>Lernhilfe</h1>
        <p>
          Kurzer Guide für Motivation, Karteikarten, Lernstrategie und kompakte Zusammenfassungen.
        </p>
      </section>

      <div className="guideGrid">
        {guideSections.map((section) => (
          <section key={section.id} className="guideCard">
            <div className="guideHeader">
              <h2>{section.title}</h2>
            </div>
            <p className="subjectMeta">{section.intro}</p>
            <ul className="guideList">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="heroCard">
        <h2 style={{ marginTop: 0 }}>Empfohlene Struktur</h2>
        <div className="structureBox">
          <div className="structureLine"><strong>Hauptthema</strong></div>
          <div className="structureLine">↳ Unterthema 1</div>
          <div className="structureLine">↳ Unterpunkt / Definition</div>
          <div className="structureLine">↳ Unterpunkt / Ablauf / Funktion</div>
          <div className="structureLine">↳ Beispiel / Merksatz</div>
        </div>
      </section>
    </div>
  );
}

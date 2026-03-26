import Link from "next/link";
import { notFound } from "next/navigation";
import { StudyClient } from "@/components/StudyClient";
import { getStudyDeckBySlug } from "@/lib/data";

export default function StudyPage({ params }: { params: { slug: string } }) {
  const deck = getStudyDeckBySlug(params.slug);
  if (!deck) {
    notFound();
  }

  return (
    <div>
      <div className="heroCard compactHero" style={{ marginBottom: 16 }}>
        <div>
          <Link href="/" className="ghostButton inlineBackButton">
            ← Zur Übersicht
          </Link>
          <h1>{deck.title}</h1>
          <p>
            {deck.cards.length} Karten · {deck.kind === "category" ? "Ganzes Fach" : deck.subtitle}
          </p>
        </div>
      </div>
      <StudyClient deck={deck} />
    </div>
  );
}

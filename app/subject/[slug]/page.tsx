import Link from "next/link";
import { notFound } from "next/navigation";
import { StudyClient } from "@/components/StudyClient";
import { getSubjectBySlug } from "@/lib/data";

export default function SubjectPage({ params }: { params: { slug: string } }) {
  const subject = getSubjectBySlug(params.slug);
  if (!subject) {
    notFound();
  }

  return (
    <div>
      <div className="heroCard" style={{ marginBottom: 16 }}>
        <Link href="/" className="ghostButton" style={{ display: "inline-block", marginBottom: 14 }}>
          ← Zur Übersicht
        </Link>
        <h1>{subject.title}</h1>
        <p>{subject.cards.length} Karten. Fortschritt wird lokal im Browser gespeichert.</p>
      </div>
      <StudyClient subject={subject} />
    </div>
  );
}

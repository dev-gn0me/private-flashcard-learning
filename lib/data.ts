import rawData from "@/data/flashcards.json";

export type Card = {
  id: string;
  nr: number;
  question: string;
  answer: string;
  section: string;
  sheet: string;
  imageRef: string | null;
};

export type Subject = {
  id: string;
  title: string;
  sourceFile: string;
  category: string;
  cards: Card[];
};

export type SubjectGroup = {
  category: string;
  subjects: Subject[];
};

export const subjects = (rawData as { subjects: Subject[] }).subjects;

export const subjectGroups: SubjectGroup[] = Object.values(
  subjects.reduce((acc, subject) => {
    if (!acc[subject.category]) {
      acc[subject.category] = { category: subject.category, subjects: [] };
    }
    acc[subject.category].subjects.push(subject);
    return acc;
  }, {} as Record<string, SubjectGroup>)
)
  .map((group) => ({
    ...group,
    subjects: group.subjects.sort((a, b) => a.title.localeCompare(b.title, "de"))
  }))
  .sort((a, b) => a.category.localeCompare(b.category, "de"));

export function getSubjectBySlug(slug: string) {
  return subjects.find((subject) => subject.id === slug);
}

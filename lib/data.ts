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
  cards: Card[];
};

export const subjects = (rawData as { subjects: Subject[] }).subjects;

export function getSubjectBySlug(slug: string) {
  return subjects.find((subject) => subject.id === slug);
}

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
  id: string;
  category: string;
  subjects: Subject[];
  cards: Card[];
};

export type StudyDeck = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  cards: Card[];
  kind: "category" | "subject";
};

export const subjects = (rawData as { subjects: Subject[] }).subjects;

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const subjectGroups: SubjectGroup[] = Object.values(
  subjects.reduce((acc, subject) => {
    if (!acc[subject.category]) {
      acc[subject.category] = {
        id: slugify(subject.category),
        category: subject.category,
        subjects: [],
        cards: []
      };
    }
    acc[subject.category].subjects.push(subject);
    acc[subject.category].cards.push(...subject.cards);
    return acc;
  }, {} as Record<string, SubjectGroup>)
)
  .map((group) => ({
    ...group,
    subjects: group.subjects.sort((a, b) => a.title.localeCompare(b.title, "de"))
  }))
  .sort((a, b) => a.category.localeCompare(b.category, "de"));

export const studyDecks: StudyDeck[] = [
  ...subjectGroups.map((group) => ({
    id: `category-${group.id}`,
    slug: `fach-${group.id}`,
    title: group.category,
    subtitle: `${group.subjects.length} Unterthemen`,
    category: group.category,
    cards: group.cards,
    kind: "category" as const
  })),
  ...subjects.map((subject) => ({
    id: `subject-${subject.id}`,
    slug: `thema-${subject.id}`,
    title: subject.title,
    subtitle: subject.category,
    category: subject.category,
    cards: subject.cards,
    kind: "subject" as const
  }))
];

export function getSubjectBySlug(slug: string) {
  return subjects.find((subject) => subject.id === slug);
}

export function getStudyDeckBySlug(slug: string) {
  return studyDecks.find((deck) => deck.slug === slug);
}

export const categories = subjectGroups.map((group) => group.category);

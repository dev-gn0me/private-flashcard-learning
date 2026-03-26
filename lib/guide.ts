export type GuideSection = {
  id: string;
  title: string;
  intro: string;
  items: string[];
};

export const guideSections: GuideSection[] = [
  {
    id: "motivation",
    title: "Motivation & Mindset",
    intro: "Lernen ist ein Prozess. Am Anfang wirkt vieles langsam und anstrengend, aber mit Regelmäßigkeit wird es leichter.",
    items: [
      "Dein Gehirn ist trainierbar: Wiederholung macht Inhalte schneller abrufbar.",
      "Lieber jeden Tag 15 bis 25 Minuten als einmal pro Woche 3 Stunden.",
      "Nicht Perfektion ist das Ziel, sondern dranzubleiben.",
      "Fehler sind nützlich: Gerade falsche Karten zeigen dir, wo echtes Lernen passiert."
    ]
  },
  {
    id: "karteikarten",
    title: "Wie man gute Karteikarten schreibt",
    intro: "Eine gute Karte testet genau eine klare Sache und ist schnell beantwortbar.",
    items: [
      "Nur eine Kernfrage pro Karte.",
      "Fragen konkret formulieren: nicht zu offen, nicht zu lang.",
      "Antworten knapp halten und auf das Wesentliche reduzieren.",
      "Bei schwierigen Themen lieber 3 kleine Karten statt 1 Riesenkarte.",
      "Beispiele, Vergleiche oder Merksätze helfen beim Erinnern."
    ]
  },
  {
    id: "lernstrategie",
    title: "Wie du optimal lernst",
    intro: "Am stärksten lernst du, wenn du aktiv abrufst statt nur zu lesen.",
    items: [
      "Erst selbst antworten, dann umdrehen.",
      "Schwierige Karten öfter wiederholen, leichte später seltener.",
      "Mische Themen, damit dein Gehirn unterscheiden und verknüpfen lernt.",
      "Kurze Sessions mit Pause sind oft besser als langes Durchziehen.",
      "Am Ende kurz wiederholen: Was konnte ich sofort? Was war noch unsicher?"
    ]
  },
  {
    id: "zusammenfassungen",
    title: "Wie man gute Zusammenfassungen schreibt",
    intro: "Eine gute Zusammenfassung ist geordnet, knapp und zeigt Zusammenhänge.",
    items: [
      "Starte mit dem Hauptthema als Überschrift.",
      "Darunter die Unterthemen als eigene Blöcke.",
      "Unter jedem Unterthema nur die wichtigsten Unterpunkte notieren.",
      "Arbeite mit Beispielen, Pfeilen oder Mini-Schemata statt Fließtext.",
      "Frage dich immer: Was muss ich wirklich wissen, um die Aufgabe zu lösen?"
    ]
  },
  {
    id: "a5",
    title: "Zusammenfassungen auf A5-Karteikarten",
    intro: "A5 lohnt sich für kompakte Übersichten, nicht für ganze Kapitel in Fließtext.",
    items: [
      "Entweder 1 Hauptthema pro Karte oder 1 sauberes Unterthema pro Karte.",
      "Oben: Thema. Mitte: 3 bis 6 Kernpunkte. Unten: Beispiel oder Merksatz.",
      "Nutze Einrückungen: Hauptthema → Unterthema → Unterpunkte.",
      "Schreibe groß und klar, damit du es in 20 Sekunden erfassen kannst.",
      "Wenn die Karte zu voll wird, splitte sie sofort in zwei Karten."
    ]
  }
];

# Karteikarten Lernapp

Private Next.js-Lernapp für Excel-Karteikarten mit einfachem Login, Mobile-UI und lokalem Lerntracking.

## Start

```bash
npm install
npm run dev
```

## Neue Excel-Dateien importieren

1. `.xlsx`-Dateien in `imports/` legen
2. Mapping in `config/subject-mapping.json` ergänzen
3. Import ausführen:

```bash
npm run import:cards
```

## Fach → Oberfach Mapping

Die Zuordnung läuft primär über `config/subject-mapping.json`.

Beispiel:

```json
{
  "Auge": { "category": "Biologie", "title": "Auge" },
  "Geographie Die Erde": { "category": "Geographie", "title": "Die Erde" }
}
```

- `category` = Oberfach
- `title` = Anzeigename des Fachs in der App

Wenn kein Mapping vorhanden ist, nutzt das Importskript einfache Fallback-Regeln.

## Login anpassen

Zugangsdaten ändern in `lib/auth.ts`.

## Tracking

Lernfortschritt wird lokal im Browser gespeichert. Für private Nutzung ist das bewusst einfach gehalten.

# Karteikarten Lernapp

Private, einfache Lernapp für deine Excel-Karteikarten.

## Was drin ist

- Next.js App für Vercel
- einfacher Hardcoded-Login
- Mobile-first Oberfläche
- Lernmodus pro Fach
- Fortschritt pro Fach im Browser gespeichert
- Import-Skript für neue `.xlsx`-Dateien

## Standard-Login

Diese Zugangsdaten sind absichtlich simpel und nur für private Nutzung gedacht:

- `admin` / `geheime-karten-2026`
- `lernuser` / `bio-geo-geschichte`

Ändern kannst du sie in `lib/auth.ts`.

## Lokal starten

```bash
npm install
npm run dev
```

## Auf Vercel deployen

1. Projekt in ein Git-Repo legen
2. Repo bei Vercel importieren
3. Deploy ausführen

## Neue Excel-Dateien hinzufügen

1. Neue `.xlsx`-Dateien in den Ordner `imports/` legen
2. Dann ausführen:

```bash
npm run import:cards
```

3. Änderungen committen und neu deployen

## Erwartetes Excel-Format

Die App erwartet pro Zeile ungefähr dieses Schema:

- `Nr.`
- `Frage`
- `Antwort`
- `Bildreferenz`

Zwischenüberschriften funktionieren als Zeilen ohne Nummer, aber mit Text in der Spalte `Frage`.

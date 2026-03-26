"use client";

import { useEffect, useMemo, useState } from "react";
import type { Card, StudyDeck } from "@/lib/data";

type DeckStats = {
  seen: number;
  correct: number;
  wrong: number;
  streak: number;
  lastStudiedAt: string | null;
  completedCardIds: string[];
};

const DEFAULT_STATS: DeckStats = {
  seen: 0,
  correct: 0,
  wrong: 0,
  streak: 0,
  lastStudiedAt: null,
  completedCardIds: [],
};

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function storageKey(deckId: string) {
  return `flashcards_progress_${deckId}`;
}

export function StudyClient({ deck }: { deck: StudyDeck }) {
  const [queue, setQueue] = useState<Card[]>([]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [mode, setMode] = useState<"all" | "open">("open");
  const [stats, setStats] = useState<DeckStats>(DEFAULT_STATS);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey(deck.id));
    if (saved) {
      try {
        setStats(JSON.parse(saved) as DeckStats);
      } catch {
        setStats(DEFAULT_STATS);
      }
      return;
    }
    setStats(DEFAULT_STATS);
  }, [deck.id]);

  useEffect(() => {
    const completed = new Set(stats.completedCardIds);
    const base =
      mode === "open"
        ? deck.cards.filter((card) => !completed.has(card.id))
        : deck.cards;
    setQueue(shuffle(base.length > 0 ? base : deck.cards));
    setIndex(0);
    setRevealed(false);
  }, [deck.cards, deck.id, mode, stats.completedCardIds]);

  const currentCard = queue[index];

  const progress = useMemo(() => {
    const total = deck.cards.length;
    const done = Math.min(stats.completedCardIds.length, total);
    return Math.round((done / total) * 100);
  }, [stats.completedCardIds.length, deck.cards.length]);

  function persist(next: DeckStats) {
    setStats(next);
    localStorage.setItem(storageKey(deck.id), JSON.stringify(next));
  }

  function markResult(result: "correct" | "wrong") {
    if (!currentCard) return;

    const completed = new Set(stats.completedCardIds);
    if (result === "correct") {
      completed.add(currentCard.id);
    }

    const nextStats: DeckStats = {
      seen: stats.seen + 1,
      correct: stats.correct + (result === "correct" ? 1 : 0),
      wrong: stats.wrong + (result === "wrong" ? 1 : 0),
      streak: result === "correct" ? stats.streak + 1 : 0,
      lastStudiedAt: new Date().toISOString(),
      completedCardIds: [...completed],
    };

    persist(nextStats);
    setRevealed(false);

    if (index + 1 < queue.length) {
      setIndex(index + 1);
      return;
    }

    const fallbackBase =
      mode === "open"
        ? deck.cards.filter((card) => !completed.has(card.id))
        : deck.cards;
    const nextQueue = shuffle(
      fallbackBase.length > 0 ? fallbackBase : deck.cards,
    );
    setQueue(nextQueue);
    setIndex(0);
  }

  function resetProgress() {
    localStorage.removeItem(storageKey(deck.id));
    setStats(DEFAULT_STATS);
    setMode("open");
  }

  if (!currentCard) {
    return <p>Keine Karten gefunden.</p>;
  }

  return (
    <div className="studyLayout">
      <div className="studyTopBar">
        <span className="pill">{deck.cards.length} Karten</span>
        <span className="pill">{progress}% gelernt</span>
        <span className="pill">Serie: {stats.streak}</span>
      </div>

      <div className="cardBox" onClick={() => setRevealed((value) => !value)}>
        <h2>{currentCard.question}</h2>
        {revealed ? (
          <div className="answerBox">
            {currentCard.answer.split("\n").map((line, i) => (
              <p key={`${currentCard.id}-${i}`}>{line}</p>
            ))}
          </div>
        ) : (
          <p className="hintText">
            Tippe auf die Karte, um die Antwort zu zeigen.
          </p>
        )}
      </div>

      <div className="buttonRow">
        <button
          className="ghostButton"
          onClick={() => setRevealed((value) => !value)}
        >
          {revealed ? "Antwort ausblenden" : "Antwort zeigen"}
        </button>
      </div>

      <div className="resultRow">
        <button className="dangerButton" onClick={() => markResult("wrong")}>
          Nicht gewusst
        </button>
        <button className="successButton" onClick={() => markResult("correct")}>
          Gewusst
        </button>
      </div>

      <div className="statsGrid">
        <div className="miniCard">
          <strong>{stats.seen}</strong>
          <span>Bearbeitet</span>
        </div>
        <div className="miniCard">
          <strong>{stats.correct}</strong>
          <span>Richtig</span>
        </div>
        <div className="miniCard">
          <strong>{stats.wrong}</strong>
          <span>Falsch</span>
        </div>
      </div>

      <div className="settingsBox">
        <label>
          Lernmodus
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as "all" | "open")}
          >
            <option value="open">Nur offene Karten</option>
            <option value="all">Alle Karten gemischt</option>
          </select>
        </label>
        <button className="ghostButton" onClick={resetProgress}>
          Fortschritt zurücksetzen
        </button>
      </div>
    </div>
  );
}

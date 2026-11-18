import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { INITIAL_CATEGORIES, type AwardCategory, type Nominee } from './data/awardsData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VotingHub } from './components/VotingHub';
import { ProposeNominee } from './components/ProposeNominee';
import { CeremonyAndArchive } from './components/CeremonyAndArchive';
import { RulesModal } from './components/RulesModal';
import { Footer } from './components/Footer';

const STORAGE_KEY = 'cringefest_2026_votes';

function loadStoredVotes(): Record<string, string> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function App() {
  const [categories, setCategories] = useState<AwardCategory[]>(INITIAL_CATEGORIES);
  const [userVotes, setUserVotes] = useState<Record<string, string>>(() => loadStoredVotes());
  const [pendingCategoryId, setPendingCategoryId] = useState<string | null>(null);
  const [voteError, setVoteError] = useState<string | null>(null);
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/nominations')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.categories) {
          setCategories(data.categories);
        }
      })
      .catch(() => {
        // Fallback to seed data silently if API unavailable
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(userVotes));
    } catch {
      // Ignore storage quota errors
    }
  }, [userVotes]);

  const handleVote = useCallback(
    async (categoryId: string, nomineeId: string) => {
      setVoteError(null);
      const previousNomineeId = userVotes[categoryId] ?? null;

      // Clicking the already selected nominee withdraws the vote in that category
      if (previousNomineeId === nomineeId) {
        setPendingCategoryId(categoryId);
        setUserVotes((prev) => {
          const next = { ...prev };
          delete next[categoryId];
          return next;
        });
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id !== categoryId
              ? cat
              : {
                  ...cat,
                  nominees: cat.nominees.map((n) =>
                    n.id === nomineeId && n.votes > 0 ? { ...n, votes: n.votes - 1 } : n
                  ),
                }
          )
        );

        try {
          const res = await fetch('/api/unvote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ categoryId, nomineeId }),
          });
          if (res.ok) {
            const payload = await res.json();
            setCategories((prev) =>
              prev.map((cat) => (cat.id === categoryId ? payload.category : cat))
            );
          }
        } catch {
          setVoteError('Не удалось синхронизировать снятие голоса с сервером.');
        } finally {
          setPendingCategoryId(null);
        }
        return;
      }

      setPendingCategoryId(categoryId);
      setUserVotes((prev) => ({ ...prev, [categoryId]: nomineeId }));
      setCategories((prev) =>
        prev.map((cat) => {
          if (cat.id !== categoryId) return cat;
          return {
            ...cat,
            nominees: cat.nominees.map((n) => {
              if (n.id === nomineeId) return { ...n, votes: n.votes + 1 };
              if (previousNomineeId && n.id === previousNomineeId && n.votes > 0) {
                return { ...n, votes: n.votes - 1 };
              }
              return n;
            }),
          };
        })
      );

      try {
        const res = await fetch('/api/vote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ categoryId, nomineeId, previousNomineeId }),
        });
        if (!res.ok) {
          throw new Error('Vote error');
        }
        const payload = await res.json();
        setCategories((prev) =>
          prev.map((cat) => (cat.id === categoryId ? payload.category : cat))
        );
      } catch {
        setVoteError('Не удалось сохранить голос на сервере. Попробуйте снова.');
      } finally {
        setPendingCategoryId(null);
      }
    },
    [userVotes]
  );

  const handleResetVotes = useCallback(async () => {
    const entries = Object.entries(userVotes);
    if (entries.length === 0) return;

    setVoteError(null);
    setUserVotes({});
    setCategories((prev) =>
      prev.map((cat) => {
        const chosenId = userVotes[cat.id];
        if (!chosenId) return cat;
        return {
          ...cat,
          nominees: cat.nominees.map((n) =>
            n.id === chosenId && n.votes > 0 ? { ...n, votes: n.votes - 1 } : n
          ),
        };
      })
    );

    await Promise.allSettled(
      entries.map(([categoryId, nomineeId]) =>
        fetch('/api/unvote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ categoryId, nomineeId }),
        })
      )
    );
  }, [userVotes]);

  const handleProposed = useCallback((categoryId: string, nominee: Nominee) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id !== categoryId
          ? cat
          : {
              ...cat,
              nominees: [...cat.nominees, nominee],
            }
      )
    );
    setUserVotes((prev) => ({ ...prev, [categoryId]: nominee.id }));
  }, []);

  const stats = useMemo(() => {
    const totalNominees = categories.reduce((sum, cat) => sum + cat.nominees.length, 0);
    const totalVotes = categories.reduce(
      (sum, cat) => sum + cat.nominees.reduce((nSum, n) => nSum + n.votes, 0),
      0
    );
    return {
      totalCategories: categories.length,
      totalNominees,
      totalVotes,
    };
  }, [categories]);

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100">
      <Header onOpenRules={() => setIsRulesOpen(true)} />
      <main>
        <Hero
          totalCategories={stats.totalCategories}
          totalNominees={stats.totalNominees}
          totalVotes={stats.totalVotes}
        />
        <VotingHub
          categories={categories}
          userVotes={userVotes}
          pendingCategoryId={pendingCategoryId}
          errorMessage={voteError}
          onVote={handleVote}
          onResetVotes={handleResetVotes}
        />
        <ProposeNominee categories={categories} onProposed={handleProposed} />
        <CeremonyAndArchive />
      </main>
      <Footer onOpenRules={() => setIsRulesOpen(true)} />
      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
    </div>
  );
}

export default App;

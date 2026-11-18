import React, { useState } from 'react';
import { Check, ExternalLink, Eye, EyeOff, RotateCcw, Trophy } from 'lucide-react';
import type { AwardCategory, CategoryGroup } from '../data/awardsData';

interface VotingHubProps {
  categories: AwardCategory[];
  userVotes: Record<string, string>;
  pendingCategoryId: string | null;
  errorMessage: string | null;
  onVote: (categoryId: string, nomineeId: string) => void;
  onResetVotes: () => void;
}

const FILTER_OPTIONS: { id: 'all' | CategoryGroup; label: string }[] = [
  { id: 'all', label: 'Все номинации' },
  { id: 'main', label: 'Главные' },
  { id: 'streaming', label: 'Стриминг' },
  { id: 'memes', label: 'Мемы и треки' },
  { id: 'fails', label: 'Провалы года' },
];

function getInitials(name: string): string {
  const words = name
    .replace(/[«»"']/g, '')
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return 'CF';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

function isSafeExternalUrl(url?: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export const VotingHub: React.FC<VotingHubProps> = ({
  categories,
  userVotes,
  pendingCategoryId,
  errorMessage,
  onVote,
  onResetVotes,
}) => {
  const [activeGroup, setActiveGroup] = useState<'all' | CategoryGroup>('all');
  const [showAllResults, setShowAllResults] = useState(false);

  const visibleCategories =
    activeGroup === 'all'
      ? categories
      : categories.filter((category) => category.group === activeGroup);

  const votedCount = Object.keys(userVotes).length;
  const totalCount = categories.length;

  return (
    <section id="nominations" className="border-b border-white/10 bg-[#09090B] py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-400">
              Народное голосование
              <span className="mx-2 text-zinc-600" aria-hidden="true">
                ·
              </span>
              8 категорий
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Шорт-лист номинаций 2026
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              Выберите одного фаворита в каждой номинации. Ваш голос сразу учитывается в общем
              подсчёте, а выбор можно изменить в любой момент до закрытия приёма бюллетеней.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-md border border-white/10 bg-[#121216] px-4 py-2 text-sm text-zinc-300 tabular-nums">
              Ваш бюллетень: <span className="font-semibold text-white">{votedCount}</span> из{' '}
              <span className="font-semibold text-white">{totalCount}</span>
            </div>

            <button
              type="button"
              onClick={() => setShowAllResults((prev) => !prev)}
              className="inline-flex min-h-10 items-center gap-2 rounded-md border border-white/15 bg-[#121216] px-4 py-2 text-sm font-medium text-zinc-200 whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-white/30 hover:text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2E4C]"
            >
              {showAllResults ? (
                <>
                  <EyeOff className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                  Скрыть проценты
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                  Показать проценты
                </>
              )}
            </button>

            {votedCount > 0 && (
              <button
                type="button"
                onClick={onResetVotes}
                className="inline-flex min-h-10 items-center gap-2 rounded-md border border-white/10 bg-transparent px-3.5 py-2 text-sm font-medium text-zinc-400 whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-white/25 hover:text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2E4C]"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Сбросить выбор
              </button>
            )}
          </div>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="mt-6 rounded-md border border-[#FF2E4C]/40 bg-[#FF2E4C]/10 px-4 py-3 text-sm text-red-200"
          >
            {errorMessage}
          </div>
        )}

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="tablist"
            aria-label="Фильтр номинаций"
            className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-white/10 bg-[#121216] p-1"
          >
            {FILTER_OPTIONS.map((option) => {
              const isActive = activeGroup === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveGroup(option.id)}
                  className={`min-h-9 rounded-md px-3.5 py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2E4C] ${
                    isActive
                      ? 'bg-[#FF2E4C] text-white'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-400">
            {visibleCategories.map((cat) => (
              <a
                key={cat.id}
                href={`#cat-${cat.id}`}
                className="whitespace-nowrap transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2E4C]"
              >
                <span className="font-mono text-zinc-500">{cat.indexLabel}</span> {cat.title}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-10">
          {visibleCategories.map((category) => {
            const categoryTotalVotes = category.nominees.reduce((sum, n) => sum + n.votes, 0);
            const selectedNomineeId = userVotes[category.id];
            const revealResults = showAllResults || Boolean(selectedNomineeId);
            const maxVotes = Math.max(...category.nominees.map((n) => n.votes), 0);
            const isCategoryPending = pendingCategoryId === category.id;

            return (
              <article
                key={category.id}
                id={`cat-${category.id}`}
                className="scroll-mt-24 rounded-lg border border-white/10 bg-[#121216] p-5 sm:p-7"
              >
                <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-400">
                      <span className="font-mono text-[#FF2E4C]">{category.indexLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{category.groupLabel}</span>
                      {selectedNomineeId && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-emerald-400">Голос засчитан</span>
                        </>
                      )}
                    </div>
                    <h3 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      {category.title}
                    </h3>
                    <p className="mt-1.5 max-w-2xl text-sm text-zinc-400">{category.subtitle}</p>
                  </div>

                  <div className="shrink-0 text-left sm:text-right">
                    <div className="font-mono text-lg font-semibold text-white tabular-nums">
                      {categoryTotalVotes.toLocaleString('ru-RU')}
                    </div>
                    <div className="text-xs text-zinc-500">голосов в категории</div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {category.nominees.map((nominee) => {
                    const isSelected = selectedNomineeId === nominee.id;
                    const percentage =
                      categoryTotalVotes > 0
                        ? Math.round((nominee.votes / categoryTotalVotes) * 1000) / 10
                        : 0;
                    const isLeader = revealResults && nominee.votes === maxVotes && maxVotes > 0;

                    return (
                      <div
                        key={nominee.id}
                        className={`flex flex-col justify-between rounded-md border p-4 transition-colors duration-150 sm:p-5 ${
                          isSelected
                            ? 'border-[#FF2E4C] bg-[#1A1216]'
                            : 'border-white/10 bg-[#0D0D11] hover:border-white/20'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3.5 min-w-0">
                              <div
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/10 bg-[#18181D] font-display text-base font-bold text-white"
                                style={{
                                  boxShadow: isSelected
                                    ? `inset 0 0 0 1px ${nominee.accentTone}`
                                    : undefined,
                                }}
                                aria-hidden="true"
                              >
                                {getInitials(nominee.name)}
                              </div>
                              <div className="min-w-0">
                                <h4 className="truncate text-base font-semibold text-white">
                                  {nominee.name}
                                </h4>
                                <p className="mt-0.5 truncate text-xs text-zinc-400">
                                  {nominee.handle}
                                  <span className="mx-1.5 text-zinc-600" aria-hidden="true">
                                    ·
                                  </span>
                                  {nominee.platform}
                                  {nominee.isCommunity && (
                                    <>
                                      <span className="mx-1.5 text-zinc-600" aria-hidden="true">
                                        ·
                                      </span>
                                      <span className="text-[#F59E0B]">Выбор зрителей</span>
                                    </>
                                  )}
                                </p>
                              </div>
                            </div>

                            {isLeader && (
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#F59E0B] whitespace-nowrap shrink-0">
                                <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
                                Лидер
                              </span>
                            )}
                          </div>

                          <p className="mt-4 text-sm font-semibold text-zinc-100">
                            {nominee.momentTitle}
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                            {nominee.description}
                          </p>
                        </div>

                        <div className="mt-5 pt-4 border-t border-white/8">
                          {revealResults && (
                            <div className="mb-3.5">
                              <div className="flex items-center justify-between text-xs tabular-nums">
                                <span className="font-mono font-medium text-zinc-300">
                                  {percentage.toFixed(1)}%
                                </span>
                                <span className="text-zinc-500">
                                  {nominee.votes.toLocaleString('ru-RU')} гол.
                                </span>
                              </div>
                              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
                                <div
                                  className="h-full rounded-full transition-transform duration-200 origin-left"
                                  style={{
                                    width: '100%',
                                    transform: `scaleX(${Math.max(0.02, percentage / 100)})`,
                                    backgroundColor: isSelected ? '#FF2E4C' : '#F59E0B',
                                  }}
                                />
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between gap-3">
                            <button
                              type="button"
                              disabled={isCategoryPending}
                              onClick={() => onVote(category.id, nominee.id)}
                              className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2E4C] ${
                                isSelected
                                  ? 'bg-[#FF2E4C] text-white hover:bg-[#E11D48]'
                                  : 'border border-white/15 bg-[#18181D] text-zinc-100 hover:border-[#FF2E4C] hover:text-white'
                              }`}
                            >
                              {isSelected ? (
                                <>
                                  <Check className="h-4 w-4" aria-hidden="true" />
                                  Ваш выбор
                                </>
                              ) : selectedNomineeId ? (
                                'Изменить выбор'
                              ) : (
                                'Голосовать'
                              )}
                            </button>

                            {isSafeExternalUrl(nominee.clipUrl) && (
                              <a
                                href={nominee.clipUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 whitespace-nowrap transition-colors duration-150 hover:text-white"
                              >
                                Смотреть клип
                                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

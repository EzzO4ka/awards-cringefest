import React, { useState } from 'react';
import { Calendar, Radio, Sparkles } from 'lucide-react';
import { CEREMONY_SCHEDULE, PAST_WINNERS } from '../data/awardsData';
import { VISUAL_ASSETS } from '../data/visualAssets';

type ScheduleTab = 'evening' | 'venue' | 'broadcast';

const SCHEDULE_TABS: { id: ScheduleTab; label: string }[] = [
  { id: 'evening', label: 'Тайминг вечера' },
  { id: 'venue', label: 'Площадка и дресс-код' },
  { id: 'broadcast', label: 'Трансляция' },
];

export const CeremonyAndArchive: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ScheduleTab>('evening');
  const [stageImgError, setStageImgError] = useState(false);
  const [carpetImgError, setCarpetImgError] = useState(false);

  const slots = CEREMONY_SCHEDULE[activeTab];

  return (
    <>
      <section id="ceremony" className="border-b border-white/10 bg-[#09090B] py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-400">
                Финал сезона
                <span className="mx-2 text-zinc-600" aria-hidden="true">
                  ·
                </span>
                12 декабря 2026
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Церемония награждения и прямой эфир
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Разделы информации о церемонии"
              className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-white/10 bg-[#121216] p-1"
            >
              {SCHEDULE_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(tab.id)}
                    className={`min-h-9 rounded-md px-3.5 py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2E4C] ${
                      isActive
                        ? 'bg-[#FF2E4C] text-white'
                        : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-7">
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-white/10 bg-[#121216]">
                {!stageImgError ? (
                  <img
                    src={VISUAL_ASSETS.ceremonyStage}
                    alt="Главная сцена церемонии Awards Cringefest в Москве"
                    referrerPolicy="no-referrer"
                    onError={() => setStageImgError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-[#18181D] p-8 text-center">
                    <Radio className="h-12 w-12 text-[#FF2E4C]" aria-hidden="true" />
                    <p className="mt-3 font-display text-2xl font-semibold text-white">
                      Москва · Live Arena · 12 декабря 2026
                    </p>
                  </div>
                )}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09090B]/90 via-[#09090B]/20 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 sm:p-6">
                  <div>
                    <p className="text-xs font-medium text-zinc-300">
                      Live Arena
                      <span className="mx-2 text-zinc-500" aria-hidden="true">
                        ·
                      </span>
                      Прямая трансляция 4K
                    </p>
                    <p className="mt-1 font-display text-2xl font-bold text-white">
                      Большой финал сезона
                    </p>
                  </div>
                  <a
                    href="#nominations"
                    className="inline-flex min-h-10 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#09090B] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-zinc-200"
                  >
                    Успеть проголосовать
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-[#121216]">
                  {!carpetImgError ? (
                    <img
                      src={VISUAL_ASSETS.redCarpet}
                      alt="Гости премии на красной дорожке под вспышками камер"
                      referrerPolicy="no-referrer"
                      onError={() => setCarpetImgError(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-[#18181D] p-6 text-center">
                      <Sparkles className="h-8 w-8 text-[#F59E0B]" aria-hidden="true" />
                      <p className="mt-2 text-sm text-zinc-300">Crimson Carpet 18:00</p>
                    </div>
                  )}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09090B]/90 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-xs text-zinc-300">18:00 МСК</p>
                    <p className="mt-0.5 font-display text-lg font-semibold text-white">
                      Красная дорожка и блиц-интервью
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-between rounded-lg border border-white/10 bg-[#121216] p-5">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                      <Calendar className="h-4 w-4 text-[#FF2E4C]" aria-hidden="true" />
                      <span>Памятка участника</span>
                    </div>
                    <h3 className="mt-3 font-display text-xl font-bold text-white">
                      Как формируется итоговый победитель
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      70% результата определяет открытое зрительское голосование на этом сайте.
                      Оставшиеся 30% выставляет независимый совет стримеров, авторов нарезок и
                      редакторов интернет-медиа.
                    </p>
                  </div>
                  <p className="mt-4 border-t border-white/10 pt-3 font-mono text-xs text-zinc-400 tabular-nums">
                    Приём голосов до 12.12.2026 · 19:00 МСК
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-[#121216] p-5 sm:p-6 lg:col-span-5">
              <h3 className="font-display text-xl font-bold text-white">
                {SCHEDULE_TABS.find((t) => t.id === activeTab)?.label}
              </h3>

              <div className="mt-5 divide-y divide-white/10">
                {slots.map((slot) => (
                  <div key={`${slot.time}-${slot.title}`} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-sm font-semibold text-[#FF2E4C] tabular-nums">
                        {slot.time}
                      </span>
                      <span className="text-xs text-zinc-400">{slot.stage}</span>
                    </div>
                    <h4 className="mt-1.5 text-base font-semibold text-white">{slot.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">{slot.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="archive" className="border-b border-white/10 bg-[#09090B] py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-400">
                Архив премии
                <span className="mx-2 text-zinc-600" aria-hidden="true">
                  ·
                </span>
                2024–2025
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Зал позора и славы
              </h2>
            </div>
            <p className="max-w-md text-sm text-zinc-400">
              Обладатели статуэток прошлых сезонов, чьи моменты уже вошли в историю рунета.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto rounded-lg border border-white/10 bg-[#121216]">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs font-medium text-zinc-400">
                  <th className="px-5 py-3.5">Сезон</th>
                  <th className="px-5 py-3.5">Номинация</th>
                  <th className="px-5 py-3.5">Лауреат</th>
                  <th className="px-5 py-3.5">Победный момент</th>
                  <th className="px-5 py-3.5 text-right">Голоса</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {PAST_WINNERS.map((item) => (
                  <tr
                    key={`${item.year}-${item.category}-${item.winner}`}
                    className="transition-colors duration-150 hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-4 font-mono text-zinc-400 tabular-nums">{item.year}</td>
                    <td className="px-5 py-4 font-medium text-zinc-200">{item.category}</td>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-white">{item.winner}</div>
                      <div className="text-xs text-zinc-500">{item.handle}</div>
                    </td>
                    <td className="px-5 py-4 text-zinc-300">{item.moment}</td>
                    <td className="px-5 py-4 text-right font-mono font-semibold text-[#F59E0B] tabular-nums">
                      {item.voteShare}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

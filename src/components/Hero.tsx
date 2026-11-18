import React, { useEffect, useState } from 'react';
import { ArrowDownRight, Trophy } from 'lucide-react';
import { VISUAL_ASSETS } from '../data/visualAssets';

interface HeroProps {
  totalCategories: number;
  totalNominees: number;
  totalVotes: number;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET_DATE = new Date('2026-12-12T20:00:00+03:00').getTime();

function computeTimeLeft(): TimeLeft {
  const diff = Math.max(0, TARGET_DATE - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export const Hero: React.FC<HeroProps> = ({
  totalCategories,
  totalNominees,
  totalVotes,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => computeTimeLeft());
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(computeTimeLeft());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const pad = (value: number) => String(value).padStart(2, '0');

  return (
    <section id="top" className="border-b border-white/10 bg-[#09090B]">
      <div className="mx-auto max-w-6xl px-4 pt-10 pb-12 sm:px-6 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <p className="text-sm font-medium text-zinc-400">
                Ежегодная премия интернет-культуры
                <span className="mx-2 text-zinc-600" aria-hidden="true">
                  ·
                </span>
                Сезон 2026
              </p>

              <h1 className="mt-4 font-display text-[clamp(2.5rem,4.6vw,4.15rem)] font-bold leading-[1.03] tracking-tight text-white">
                Премия Awards Cringefest 2026
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                Народная церемония, где главными героями становятся неидеальные прямые эфиры,
                громкие технические фейлы, вирусные фразы и моменты, которые весь год
                пересылали друг другу в чатах.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#nominations"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#FF2E4C] px-6 py-3 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#E11D48] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2E4C]"
                >
                  Перейти к номинациям
                  <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <a
                  href="#propose"
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 bg-[#121216] px-5 py-3 text-sm font-medium text-zinc-200 whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-white/30 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2E4C]"
                >
                  Выдвинуть кандидата
                </a>
              </div>
            </div>

            <div className="mt-10 border-t border-white/10 pt-6">
              <p className="text-xs font-medium text-zinc-400">
                До закрытия голосования и начала эфира
              </p>
              <div className="mt-3 grid grid-cols-4 gap-3 sm:max-w-md">
                <div className="rounded-md border border-white/10 bg-[#121216] px-3 py-2.5">
                  <div className="font-mono text-2xl font-semibold text-white tabular-nums">
                    {pad(timeLeft.days)}
                  </div>
                  <div className="mt-0.5 text-xs text-zinc-400">дней</div>
                </div>
                <div className="rounded-md border border-white/10 bg-[#121216] px-3 py-2.5">
                  <div className="font-mono text-2xl font-semibold text-white tabular-nums">
                    {pad(timeLeft.hours)}
                  </div>
                  <div className="mt-0.5 text-xs text-zinc-400">часов</div>
                </div>
                <div className="rounded-md border border-white/10 bg-[#121216] px-3 py-2.5">
                  <div className="font-mono text-2xl font-semibold text-white tabular-nums">
                    {pad(timeLeft.minutes)}
                  </div>
                  <div className="mt-0.5 text-xs text-zinc-400">минут</div>
                </div>
                <div className="rounded-md border border-white/10 bg-[#121216] px-3 py-2.5">
                  <div className="font-mono text-2xl font-semibold text-[#FF2E4C] tabular-nums">
                    {pad(timeLeft.seconds)}
                  </div>
                  <div className="mt-0.5 text-xs text-zinc-400">секунд</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[300px] overflow-hidden rounded-lg border border-white/10 bg-[#121216]">
              {!imgError ? (
                <img
                  src={VISUAL_ASSETS.heroTrophy}
                  alt="Статуэтка премии Awards Cringefest — скульптурная маска и студийный микрофон"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full min-h-[320px] flex-col items-center justify-center bg-gradient-to-br from-[#18181D] via-[#121216] to-[#280B12] p-8 text-center">
                  <Trophy className="h-14 w-14 text-[#FF2E4C]" aria-hidden="true" />
                  <p className="mt-4 font-display text-2xl font-semibold text-white">
                    Статуэтка Awards Cringefest
                  </p>
                </div>
              )}

              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09090B]/90 via-[#09090B]/20 to-transparent"
                aria-hidden="true"
              />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="text-xs font-medium text-zinc-300">
                  12 декабря 2026
                  <span className="mx-2 text-zinc-500" aria-hidden="true">
                    ·
                  </span>
                  Москва, Live Arena
                </p>
                <p className="mt-1 font-display text-xl font-semibold text-white">
                  Главный трофей зрительского выбора
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4 sm:gap-6">
          <div>
            <div className="font-mono text-2xl font-semibold text-white tabular-nums">
              {totalCategories}
            </div>
            <div className="mt-1 text-sm text-zinc-400">Официальных номинаций</div>
          </div>
          <div>
            <div className="font-mono text-2xl font-semibold text-white tabular-nums">
              {totalNominees}
            </div>
            <div className="mt-1 text-sm text-zinc-400">Претендентов в шорт-листе</div>
          </div>
          <div>
            <div className="font-mono text-2xl font-semibold text-white tabular-nums">
              {totalVotes.toLocaleString('ru-RU')}
            </div>
            <div className="mt-1 text-sm text-zinc-400">Учтённых голосов зрителей</div>
          </div>
          <div>
            <div className="font-mono text-2xl font-semibold text-[#F59E0B] tabular-nums">
              70 / 30
            </div>
            <div className="mt-1 text-sm text-zinc-400">Вес голосов: зрители и жюри</div>
          </div>
        </div>
      </div>
    </section>
  );
};

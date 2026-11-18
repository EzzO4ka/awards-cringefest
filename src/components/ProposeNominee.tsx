import React, { useState } from 'react';
import { CheckCircle2, Film, Send } from 'lucide-react';
import type { AwardCategory, Nominee } from '../data/awardsData';
import { VISUAL_ASSETS } from '../data/visualAssets';

interface ProposeNomineeProps {
  categories: AwardCategory[];
  onProposed: (categoryId: string, nominee: Nominee) => void;
}

export const ProposeNominee: React.FC<ProposeNomineeProps> = ({ categories, onProposed }) => {
  const [categoryId, setCategoryId] = useState<string>(categories[0]?.id ?? 'cringe-king');
  const [nomineeName, setNomineeName] = useState('');
  const [handle, setHandle] = useState('');
  const [platform, setPlatform] = useState('Twitch');
  const [momentTitle, setMomentTitle] = useState('');
  const [description, setDescription] = useState('');
  const [clipUrl, setClipUrl] = useState('');

  const [imgError, setImgError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedInfo, setSubmittedInfo] = useState<{
    categoryId: string;
    nomineeName: string;
  } | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);

    if (!nomineeName.trim()) {
      setFormError('Укажите имя или никнейм кандидата.');
      return;
    }

    if (!momentTitle.trim()) {
      setFormError('Опишите заголовок момента — что именно произошло.');
      return;
    }

    if (clipUrl.trim()) {
      try {
        const parsed = new URL(clipUrl.trim());
        if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
          setFormError('Ссылка должна начинаться с https:// или http://.');
          return;
        }
      } catch {
        setFormError('Проверьте корректность ссылки на клип или оставьте поле пустым.');
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/propose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId,
          nomineeName,
          handle,
          platform,
          momentTitle,
          description,
          clipUrl,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        setFormError(payload.error || 'Не удалось добавить кандидата.');
        return;
      }

      onProposed(categoryId, payload.nominee);
      setSubmittedInfo({
        categoryId,
        nomineeName: payload.nominee.name,
      });

      setNomineeName('');
      setHandle('');
      setMomentTitle('');
      setDescription('');
      setClipUrl('');
    } catch {
      setFormError('Ошибка сети при отправке заявки. Попробуйте ещё раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="propose" className="border-b border-white/10 bg-[#09090B] py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="text-sm font-medium text-zinc-400">
                Открытый отбор
                <span className="mx-2 text-zinc-600" aria-hidden="true">
                  ·
                </span>
                Выбор комьюнити
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Предложить своего номинанта
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                Пропустили легендарный фейл или смешной момент со стрима? Добавьте кандидата в
                нужную категорию — карточка сразу появится в общем шорт-листе для голосования.
              </p>
            </div>

            <div className="mt-6 overflow-hidden rounded-lg border border-white/10 bg-[#121216]">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                {!imgError ? (
                  <img
                    src={VISUAL_ASSETS.streamChaos}
                    alt="Стример за рабочим столом с микрофоном во время прямого эфира"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-[#18181D] p-6 text-center">
                    <Film className="h-10 w-10 text-[#FF2E4C]" aria-hidden="true" />
                    <p className="mt-2 text-sm text-zinc-300">Открытый отбор клипов 2026</p>
                  </div>
                )}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121216] via-[#121216]/25 to-transparent"
                  aria-hidden="true"
                />
              </div>

              <div className="space-y-3 p-5 text-sm">
                <div>
                  <span className="font-mono text-xs text-[#FF2E4C]">01.</span>{' '}
                  <span className="font-medium text-white">Выберите категорию</span>
                  <span className="text-zinc-400"> — от главного титула до фейла года.</span>
                </div>
                <div>
                  <span className="font-mono text-xs text-[#FF2E4C]">02.</span>{' '}
                  <span className="font-medium text-white">Опишите сцену</span>
                  <span className="text-zinc-400"> — коротко, без спойлеров и оскорблений.</span>
                </div>
                <div>
                  <span className="font-mono text-xs text-[#FF2E4C]">03.</span>{' '}
                  <span className="font-medium text-white">Собирайте голоса</span>
                  <span className="text-zinc-400"> — заявка сразу доступна всем зрителям.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex h-full flex-col justify-between rounded-lg border border-white/10 bg-[#121216] p-6 sm:p-8"
            >
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="propose-category"
                      className="block text-xs font-medium text-zinc-300"
                    >
                      Номинация
                    </label>
                    <select
                      id="propose-category"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="mt-1.5 min-h-11 w-full rounded-md border border-white/15 bg-[#09090B] px-3.5 py-2.5 text-sm text-white focus:border-[#FF2E4C] focus:outline-none"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.indexLabel}. {cat.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="propose-platform"
                      className="block text-xs font-medium text-zinc-300"
                    >
                      Платформа
                    </label>
                    <select
                      id="propose-platform"
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="mt-1.5 min-h-11 w-full rounded-md border border-white/15 bg-[#09090B] px-3.5 py-2.5 text-sm text-white focus:border-[#FF2E4C] focus:outline-none"
                    >
                      <option value="Twitch">Twitch</option>
                      <option value="YouTube">YouTube</option>
                      <option value="Kick">Kick</option>
                      <option value="VK Видео">VK Видео</option>
                      <option value="Telegram / Shorts">Telegram / Shorts</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="propose-name"
                      className="block text-xs font-medium text-zinc-300"
                    >
                      Имя или никнейм кандидата *
                    </label>
                    <input
                      id="propose-name"
                      type="text"
                      required
                      maxLength={60}
                      value={nomineeName}
                      onChange={(e) => setNomineeName(e.target.value)}
                      placeholder="Например, Дима Камера"
                      className="mt-1.5 min-h-11 w-full rounded-md border border-white/15 bg-[#09090B] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-[#FF2E4C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="propose-handle"
                      className="block text-xs font-medium text-zinc-300"
                    >
                      Ник или канал
                    </label>
                    <input
                      id="propose-handle"
                      type="text"
                      maxLength={40}
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      placeholder="@dima_cam"
                      className="mt-1.5 min-h-11 w-full rounded-md border border-white/15 bg-[#09090B] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-[#FF2E4C] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="propose-moment"
                    className="block text-xs font-medium text-zinc-300"
                  >
                    Название момента *
                  </label>
                  <input
                    id="propose-moment"
                    type="text"
                    required
                    maxLength={90}
                    value={momentTitle}
                    onChange={(e) => setMomentTitle(e.target.value)}
                    placeholder="Например, 40 минут спорил с ботом техподдержки"
                    className="mt-1.5 min-h-11 w-full rounded-md border border-white/15 bg-[#09090B] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-[#FF2E4C] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="propose-description"
                    className="block text-xs font-medium text-zinc-300"
                  >
                    Контекст для зрителей
                  </label>
                  <textarea
                    id="propose-description"
                    rows={3}
                    maxLength={220}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Коротко расскажите, что произошло и почему это должно победить..."
                    className="mt-1.5 w-full rounded-md border border-white/15 bg-[#09090B] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-[#FF2E4C] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="propose-clip"
                    className="block text-xs font-medium text-zinc-300"
                  >
                    Ссылка на клип или таймкод (необязательно)
                  </label>
                  <input
                    id="propose-clip"
                    type="url"
                    value={clipUrl}
                    onChange={(e) => setClipUrl(e.target.value)}
                    placeholder="https://clips.twitch.tv/..."
                    className="mt-1.5 min-h-11 w-full rounded-md border border-white/15 bg-[#09090B] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-[#FF2E4C] focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
                {formError && (
                  <p role="alert" className="text-sm font-medium text-[#FF2E4C]">
                    {formError}
                  </p>
                )}

                {submittedInfo && (
                  <div className="flex flex-col gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-sm text-emerald-200 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                      <span>
                        Кандидат <strong>{submittedInfo.nomineeName}</strong> добавлен в шорт-лист!
                      </span>
                    </div>
                    <a
                      href={`#cat-${submittedInfo.categoryId}`}
                      className="font-semibold text-white underline underline-offset-4 whitespace-nowrap"
                    >
                      Перейти к голосованию
                    </a>
                  </div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-zinc-500">
                    Заявка появляется в номинации мгновенно с пометкой «Выбор зрителей».
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#FF2E4C] px-6 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#E11D48] disabled:opacity-60 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2E4C]"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    {isSubmitting ? 'Отправка...' : 'Добавить в шорт-лист'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

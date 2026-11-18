import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="rules-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-lg border border-white/15 bg-[#121216] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-xs font-medium text-zinc-400">Официальные правила · 2026</p>
            <h2
              id="rules-modal-title"
              className="mt-1 font-display text-2xl font-bold text-white"
            >
              Регламент премии Awards Cringefest
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть регламент"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-zinc-400 transition-colors hover:border-white/25 hover:text-white cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-zinc-300">
          <div>
            <h3 className="font-semibold text-white">01. Принцип голосования</h3>
            <p className="mt-1 text-zinc-400">
              Каждый зритель может отдать один голос в каждой из 8 категорий. Голос можно
              переназначить или отозвать до 12 декабря 2026 года, 19:00 МСК.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white">02. Формула подсчёта</h3>
            <p className="mt-1 text-zinc-400">
              Итоговый балл складывается из народного голосования (70%) и закрытого бюллетеня
              совета стримеров, монтажников и редакторов комьюнити (30%).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white">03. Выдвижение зрителями</h3>
            <p className="mt-1 text-zinc-400">
              Номинанты из открытой формы попадают в шорт-лист с пометкой «Выбор зрителей». Заявки
              с оскорблениями, личными данными или нарушением правил платформ снимаются с участия.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-10 items-center justify-center rounded-md bg-[#FF2E4C] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#E11D48] cursor-pointer"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';

interface FooterProps {
  onOpenRules: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRules }) => {
  return (
    <footer className="bg-[#09090B] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <a href="#top" className="font-display text-lg font-bold tracking-tight text-white">
            CRINGEFEST
          </a>
          <p className="mt-1 text-xs text-zinc-500">
            © 2026 Awards Cringefest · Независимая премия интернет-культуры и стриминга
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400">
          <a href="#nominations" className="transition-colors hover:text-white">
            Номинации
          </a>
          <a href="#propose" className="transition-colors hover:text-white">
            Предложить кандидата
          </a>
          <a href="#ceremony" className="transition-colors hover:text-white">
            Церемония
          </a>
          <a href="#archive" className="transition-colors hover:text-white">
            Зал славы
          </a>
          <button
            type="button"
            onClick={onOpenRules}
            className="text-left transition-colors hover:text-white cursor-pointer"
          >
            Регламент премии
          </button>
        </div>
      </div>
    </footer>
  );
};

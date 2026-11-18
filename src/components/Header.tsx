import React from 'react';

interface HeaderProps {
  onOpenRules: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenRules }) => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#09090B]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6">
        <a
          href="#top"
          className="font-display text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF2E4C]"
        >
          CRINGEFEST
        </a>

        <nav
          aria-label="Основная навигация"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400"
        >
          <a
            href="#nominations"
            className="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF2E4C]"
          >
            Номинации
          </a>
          <a
            href="#propose"
            className="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF2E4C]"
          >
            Выдвинуть
          </a>
          <a
            href="#ceremony"
            className="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF2E4C]"
          >
            Церемония
          </a>
          <a
            href="#archive"
            className="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF2E4C]"
          >
            Зал славы
          </a>
          <button
            type="button"
            onClick={onOpenRules}
            className="whitespace-nowrap shrink-0 py-1 text-left transition-colors duration-150 hover:text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF2E4C]"
          >
            Регламент
          </button>
        </nav>

        <div className="flex items-center shrink-0">
          <a
            href="#nominations"
            className="inline-flex min-h-10 items-center justify-center rounded-md bg-[#FF2E4C] px-4 py-2 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#E11D48] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2E4C]"
          >
            Голосовать
          </a>
        </div>
      </div>
    </header>
  );
};

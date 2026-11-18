export type CategoryGroup = 'main' | 'streaming' | 'memes' | 'fails';

export interface Nominee {
  id: string;
  name: string;
  handle: string;
  platform: string;
  momentTitle: string;
  description: string;
  votes: number;
  accentTone: string;
  isCommunity?: boolean;
  clipUrl?: string;
}

export interface AwardCategory {
  id: string;
  indexLabel: string;
  group: CategoryGroup;
  groupLabel: string;
  title: string;
  subtitle: string;
  nominees: Nominee[];
}

export interface PastWinner {
  year: string;
  category: string;
  winner: string;
  handle: string;
  moment: string;
  voteShare: string;
}

export interface CeremonySlot {
  time: string;
  title: string;
  details: string;
  stage: string;
}

export const INITIAL_CATEGORIES: AwardCategory[] = [
  {
    id: 'cringe-king',
    indexLabel: '01',
    group: 'main',
    groupLabel: 'Главная номинация',
    title: 'Король и королева кринжа',
    subtitle: 'Главный титул года за самый обсуждаемый, абсурдный и безоговорочно вирусный выход в прямой эфир.',
    nominees: [
      {
        id: 'ck-1',
        name: 'Макс «Овертайм» Воронов',
        handle: '@voronov_live',
        platform: 'Twitch',
        momentTitle: '14 часов настройки OBS перед пустым залом',
        description: 'Запустил юбилейный марафон с оркестром, забыв отключить сцену «Скоро начнём» на первые два часа.',
        votes: 14820,
        accentTone: '#FF2E4C',
      },
      {
        id: 'ck-2',
        name: 'Алина Кингсайз',
        handle: '@alina_kingsize',
        platform: 'YouTube',
        momentTitle: 'Кулинарный баттл с пожарной сигнализацией',
        description: 'Попыталась приготовить фламбе на игровой клавиатуре и вызвала консьержа в прямом эфире.',
        votes: 13290,
        accentTone: '#E11D48',
      },
      {
        id: 'ck-3',
        name: 'Дима Солярис',
        handle: '@solaris_gg',
        platform: 'Kick',
        momentTitle: 'Интервью самому себе на двух камерах',
        description: 'Потерял гостя перед стартом подкаста и 40 минут спорил со своей записью в разных париках.',
        votes: 11040,
        accentTone: '#F59E0B',
      },
      {
        id: 'ck-4',
        name: 'Лера Пиксель',
        handle: '@lera_pixel',
        platform: 'Twitch',
        momentTitle: 'Премьера мерча с опечаткой в слове',
        description: 'Презентовала лимитную худи-коллекцию, где на спине вместо «Legend» было напечатано «Legned».',
        votes: 9840,
        accentTone: '#FB7185',
      },
    ],
  },
  {
    id: 'fail-of-year',
    indexLabel: '02',
    group: 'fails',
    groupLabel: 'Провал года',
    title: 'Технический фейл года',
    subtitle: 'Момент, когда техника, скрипт или самоуверенность подвели ровно в секунду пикового онлайна.',
    nominees: [
      {
        id: 'fy-1',
        name: 'Тимур Бэкэнд',
        handle: '@timur_dev',
        platform: 'Twitch',
        momentTitle: 'Удаление продакшн-базы на благотворительном стриме',
        description: 'Решил починить кнопку донатов в прямом эфире и ввёл команду без фильтра на основном сервере.',
        votes: 16410,
        accentTone: '#FF2E4C',
      },
      {
        id: 'fy-2',
        name: 'Стас Реактор',
        handle: '@reactor_show',
        platform: 'VK Видео',
        momentTitle: 'Финал турнира с выключенным звуком игры',
        description: 'Полтора часа комментировал напряжённый клатч, имитируя взрывы и шаги собственным голосом.',
        votes: 12180,
        accentTone: '#F59E0B',
      },
      {
        id: 'fy-3',
        name: 'Катя Вайб',
        handle: '@katya_vibe',
        platform: 'YouTube',
        momentTitle: 'Хромакей в цвет костюма',
        description: 'Пришла на церемонию обзора трендов в ярко-зелёном пиджаке и провела эфир в виде парящей головы.',
        votes: 10950,
        accentTone: '#E11D48',
      },
      {
        id: 'fy-4',
        name: 'Илья Саундчек',
        handle: '@soundcheck_fm',
        platform: 'Twitch',
        momentTitle: 'Тройное эхо на 80 000 зрителей',
        description: 'Случайно зациклил свой микрофон через колонку соседа по квартире и спорил сам с собой 6 минут.',
        votes: 8730,
        accentTone: '#F97316',
      },
    ],
  },
  {
    id: 'hot-mic',
    indexLabel: '03',
    group: 'streaming',
    groupLabel: 'Стриминг',
    title: 'Микрофон забыли выключить',
    subtitle: 'Откровения после титров, когда автор был уверен, что кнопка «Завершить эфир» уже нажата.',
    nominees: [
      {
        id: 'hm-1',
        name: 'Никита Спаркс',
        handle: '@sparks_tv',
        platform: 'Twitch',
        momentTitle: '«Ребят, я эти суши вообще не люблю»',
        description: 'Сразу после рекламной интеграции доставки пошёл на кухню, не заметив петличку на футболке.',
        votes: 15340,
        accentTone: '#FF2E4C',
      },
      {
        id: 'hm-2',
        name: 'Оля Глитч',
        handle: '@olya_glitch',
        platform: 'Kick',
        momentTitle: 'Репетиция «искреннего» удивления подарку',
        description: 'За 3 минуты до старта распаковки по репетиционному плану трижды отработала фразу «Ой, не может быть!».',
        votes: 11890,
        accentTone: '#F59E0B',
      },
      {
        id: 'hm-3',
        name: 'Рома Маркет',
        handle: '@roma_market',
        platform: 'YouTube',
        momentTitle: 'Честный разбор собственного трека',
        description: 'После завершения премьеры клипа шёпотом спросил звукорежиссёра, нельзя ли удалить второй куплет.',
        votes: 9420,
        accentTone: '#FB7185',
      },
      {
        id: 'hm-4',
        name: 'Женя Кадр',
        handle: '@zhenya_kadr',
        platform: 'Twitch',
        momentTitle: 'Разговор с котом о рейтинге чата',
        description: 'Полночи серьёзно обсуждал с британским котом стратегию по возвращению зрителей из Telegram.',
        votes: 8610,
        accentTone: '#E11D48',
      },
    ],
  },
  {
    id: 'meme-engine',
    indexLabel: '04',
    group: 'memes',
    groupLabel: 'Мемы и треки',
    title: 'Мем-генератор года',
    subtitle: 'Фраза, взгляд или 4-секундный клип, который за сутки захватил все нарезки и комментарии.',
    nominees: [
      {
        id: 'me-1',
        name: 'Степан «Так и задумано»',
        handle: '@stepan_play',
        platform: 'Twitch',
        momentTitle: 'Сломанное кресло в решающем раунде',
        description: 'Упал спиной на пол во время флешки и выдал невозмутимое «Это тактика низкого профиля» на 4M просмотров.',
        votes: 18200,
        accentTone: '#FF2E4C',
      },
      {
        id: 'me-2',
        name: 'Даша Плейлист',
        handle: '@dasha_playlist',
        platform: 'TikTok / Reels',
        momentTitle: 'Взгляд на донат в 10 рублей с текстом на 3 минуты',
        description: 'Выдержала идеальную 19-секундную паузу, пока бот читал длинную копипасту про рецепт окрошки.',
        votes: 14650,
        accentTone: '#F59E0B',
      },
      {
        id: 'me-3',
        name: 'Глеб Ночной',
        handle: '@gleb_night',
        platform: 'YouTube',
        momentTitle: 'Обзор на «секретный» геймерский воздух',
        description: 'С абсолютно серьёзным лицом 12 минут сравнивал вкус кислорода из баллончиков за 4 900 рублей.',
        votes: 11340,
        accentTone: '#E11D48',
      },
      {
        id: 'me-4',
        name: 'Ксюша Байт',
        handle: '@ksusha_bite',
        platform: 'Twitch',
        momentTitle: '«Я просто нажала Alt+F4 посмотреть FPS»',
        description: 'Вылетела из финального матча с командой на миллион рублей, поверив старейшей шутке из чата.',
        votes: 10890,
        accentTone: '#FB7185',
      },
    ],
  },
  {
    id: 'awkward-collab',
    indexLabel: '05',
    group: 'streaming',
    groupLabel: 'Стриминг',
    title: 'Коллаб, который пошёл не так',
    subtitle: 'Совместный проект звёздных авторов, превратившийся в эталон неловких пауз и хаоса.',
    nominees: [
      {
        id: 'ac-1',
        name: 'Squad 404 × Неоновые Коты',
        handle: '@squad404',
        platform: 'Twitch',
        momentTitle: 'Совместный квест в закрытой комнате',
        description: 'Пять стримеров перессорились из-за кода к первому замку и молча разгадывали судоку по отдельности.',
        votes: 12740,
        accentTone: '#FF2E4C',
      },
      {
        id: 'ac-2',
        name: 'Боря Классик и DJ Скип',
        handle: '@borya_classic',
        platform: 'VK Видео',
        momentTitle: 'Интервью без общего языка и переводчика',
        description: 'Пригласили иностранного гостя, думая, что автосубтитры сами переведут диалог в реальном времени.',
        votes: 11430,
        accentTone: '#F59E0B',
      },
      {
        id: 'ac-3',
        name: 'Вика Метро и Денис Лофт',
        handle: '@vika_metro',
        platform: 'YouTube',
        momentTitle: 'Рубрика «Готовим по памяти»',
        description: 'Перепутали соль с лимонной кислотой и 10 минут вежливо хвалили блюдо друг друга на камеру.',
        votes: 9120,
        accentTone: '#E11D48',
      },
      {
        id: 'ac-4',
        name: 'Лига Новичков',
        handle: '@liga_new',
        platform: 'Kick',
        momentTitle: 'Шоу-матч без админа лобби',
        description: 'Десять участников 50 минут не могли выбрать карту, пока зрители не разошлись смотреть повтор.',
        votes: 7650,
        accentTone: '#F97316',
      },
    ],
  },
  {
    id: 'broken-promise',
    indexLabel: '06',
    group: 'fails',
    groupLabel: 'Провал года',
    title: 'Обещание года',
    subtitle: 'Самый громкий челлендж, пари или анонс «скоро дроп», который растворился в тумане отговорок.',
    nominees: [
      {
        id: 'bp-1',
        name: 'Артур «Завтра Точно»',
        handle: '@artur_nextday',
        platform: 'Telegram / Twitch',
        momentTitle: 'Анонс документального фильма «За 48 часов»',
        description: 'Запустил обратный отсчёт в январе 2026 года, перенёс релиз 11 раз и выпустил 15-секундный тизер.',
        votes: 13980,
        accentTone: '#FF2E4C',
      },
      {
        id: 'bp-2',
        name: 'Паша Марафон',
        handle: '@pasha_run',
        platform: 'Twitch',
        momentTitle: 'Стрим на 100 дней без выхода из игры',
        description: 'Закончился на третьи сутки фразой «Ребят, спина важнее контента, увидимся в понедельник».',
        votes: 11920,
        accentTone: '#F59E0B',
      },
      {
        id: 'bp-3',
        name: 'Яна Дизайн',
        handle: '@yana_studio',
        platform: 'YouTube',
        momentTitle: 'Обещание покрасить волосы в цвет топа чата',
        description: 'Вместо кислотно-зелёного выбрала «благородный тёмно-оливковый при дневном свете».',
        votes: 8890,
        accentTone: '#FB7185',
      },
      {
        id: 'bp-4',
        name: 'Макс Кибер',
        handle: '@max_cyber',
        platform: 'Kick',
        momentTitle: 'Рейтинг 3000 ELO до конца месяца',
        description: 'Зафиксировал падение на 450 очков и торжественно переименовал рубрику в «Путь к удовольствию».',
        votes: 7940,
        accentTone: '#E11D48',
      },
    ],
  },
  {
    id: 'earworm-track',
    indexLabel: '07',
    group: 'memes',
    groupLabel: 'Мемы и треки',
    title: 'Трек-залипалка года',
    subtitle: 'Дисс, фристайл на донате или случайный рингтон, который звучал из каждого второго шортса.',
    nominees: [
      {
        id: 'et-1',
        name: 'MC Бутерброд feat. Чат',
        handle: '@mc_sandwich',
        platform: 'VK Музыка / Twitch',
        momentTitle: '«Где мой сабгифт, брат?»',
        description: 'Написан за 11 минут под бит из холодильника, но собрал 2,8 млн прослушиваний за первый месяц.',
        votes: 14110,
        accentTone: '#FF2E4C',
      },
      {
        id: 'et-2',
        name: 'Аня Реверб',
        handle: '@anya_reverb',
        platform: 'YouTube',
        momentTitle: 'Баллада про сломанный роутер',
        description: 'Спела под автотюн в момент отключения интернета и попала в чарты вирусных звуков.',
        votes: 12040,
        accentTone: '#F59E0B',
      },
      {
        id: 'et-3',
        name: 'Братья Лаги',
        handle: '@lag_brothers',
        platform: 'TikTok',
        momentTitle: 'Ремикс на системный звук Windows XP',
        description: 'Свели с голосовыми сообщениями из Discord-конференции в 4 утра.',
        votes: 9680,
        accentTone: '#E11D48',
      },
      {
        id: 'et-4',
        name: 'Толя Кавер',
        handle: '@tolya_cover',
        platform: 'Twitch',
        momentTitle: 'Рок-опера по правилам модерации',
        description: 'Переложил пользовательское соглашение платформы на гитарные риффы и сорвал голос на 4-м пункте.',
        votes: 8420,
        accentTone: '#FB7185',
      },
    ],
  },
  {
    id: 'chat-legend',
    indexLabel: '08',
    group: 'main',
    groupLabel: 'Главная номинация',
    title: 'Легенда чата и комьюнити',
    subtitle: 'Событие, которое создали сами зрители: флешмоб, паста или донат, переигравший ведущего.',
    nominees: [
      {
        id: 'cl-1',
        name: 'Комьюнити «Тайный Модер»',
        handle: '@secret_mod',
        platform: 'Twitch',
        momentTitle: 'Массовая смена ников на имена мебели',
        description: 'Три тысячи зрителей одновременно переименовались в «Табурет_01» — «Шкаф_Купе» и запутали статистику.',
        votes: 13670,
        accentTone: '#FF2E4C',
      },
      {
        id: 'cl-2',
        name: 'Фан-клуб «Ночной Донат»',
        handle: '@night_donate',
        platform: 'DonationAlerts',
        momentTitle: 'Аукцион на просмотр инструкции к микроволновке',
        description: 'Собрали 420 000 рублей, чтобы стример с выражением прочитал 36 страниц технического паспорта.',
        votes: 12940,
        accentTone: '#F59E0B',
      },
      {
        id: 'cl-3',
        name: 'Зритель под ником @Просто_Олег',
        handle: '@prosto_oleg',
        platform: 'YouTube',
        momentTitle: 'Единственный правильный ответ в викторине на 50 человек',
        description: 'Угадал год выпуска патча по пикселю травы и получил статус почётного аналитика премии.',
        votes: 10210,
        accentTone: '#E11D48',
      },
      {
        id: 'cl-4',
        name: 'Чат канала «Поздний Эфир»',
        handle: '@late_stream',
        platform: 'Twitch',
        momentTitle: 'Коллективный запрет на слово «кринж»',
        description: 'Уговорили автора провести трёхчасовой эфир в смокинге, заменяя любое сленговое слово термином из балета.',
        votes: 9150,
        accentTone: '#FB7185',
      },
    ],
  },
];

export const CEREMONY_SCHEDULE: Record<'evening' | 'venue' | 'broadcast', CeremonySlot[]> = {
  evening: [
    {
      time: '18:00',
      title: 'Открытие дверей и Crimson Carpet',
      details: 'Встреча номинантов на обсидиановой дорожке, блиц-интервью с разбором главных мемов года и фотозона с маской Cringefest.',
      stage: 'Фойе Live Arena',
    },
    {
      time: '19:30',
      title: 'Пре-шоу и народный трибунал чата',
      details: 'Прямое включение со студийной аналитикой: сравнение ставок зрителей и последних часов до закрытия бюллетеней.',
      stage: 'Малая сцена',
    },
    {
      time: '20:30',
      title: 'Основная церемония награждения',
      details: 'Вручение 8 статуэток в главных категориях, живые выступления авторов треков-залипалок и неожиданные примирения на сцене.',
      stage: 'Главный зал',
    },
    {
      time: '23:00',
      title: 'Закрытое афтепати победителей',
      details: 'Разбор бэкстейджа, диджей-сет из вирусных звуков сезона и ночной подкаст с обладателями Гран-при.',
      stage: 'Атриум',
    },
  ],
  venue: [
    {
      time: 'Адрес',
      title: 'Москва, Live Arena · Западный вход',
      details: 'Специальная рассадка с панорамным обзором сцены, три фан-зоны для комьюнити стримеров и интерактивные терминалы голосования.',
      stage: 'Вместимость 6 500 мест',
    },
    {
      time: 'Дресс-код',
      title: 'Obsidian & Acid Crimson',
      details: 'Строгий чёрный монохром с одним ярким алым акцентом — от классических костюмов до ироничного стритвер-авангарда.',
      stage: 'Красная дорожка',
    },
    {
      time: 'Доступ',
      title: 'Билеты для зрителей и аккредитация прессы',
      details: 'Партер, фан-трибуна и медиа-ложа открываются за 120 минут до начала эфира. Цифровой пропуск приходит на почту после регистрации.',
      stage: '18+ · Вход по QR',
    },
  ],
  broadcast: [
    {
      time: '20:00 МСК',
      title: 'Основной поток на Twitch и VK Видео',
      details: 'Мультикамерная трансляция в 4K 60fps с переключением между главной сценой, кулуарами красной дорожки и комнатой реакций.',
      stage: 'Главный канал премии',
    },
    {
      time: 'Рестримы',
      title: 'Официальные комьюнити-касты',
      details: 'Более 40 приглашённых авторов проведут совместный просмотр с синхронизированными титрами и живым чатом.',
      stage: 'Партнёрская сеть',
    },
    {
      time: 'Итоги',
      title: 'Публикация протокола голосования',
      details: 'Сразу после финального объявления на сайте появятся точные проценты народного голосования (70%) и оценки совета жюри (30%).',
      stage: 'Открытый отчёт',
    },
  ],
};

export const PAST_WINNERS: PastWinner[] = [
  {
    year: '2025',
    category: 'Король кринжа',
    winner: 'Егор Скрипт',
    handle: '@egor_script',
    moment: 'Запустил розыгрыш ПК, где победителем трижды подряд выпал его собственный бот-тестировщик.',
    voteShare: '41.8%',
  },
  {
    year: '2025',
    category: 'Фейл года',
    winner: 'Мила Стрим',
    handle: '@mila_stream',
    moment: 'Попрощалась со зрителями и ещё 25 минут подпевала поп-хитам, забыв выключить веб-камеру.',
    voteShare: '38.4%',
  },
  {
    year: '2025',
    category: 'Трек-залипалка',
    winner: 'MC Пинг 999',
    handle: '@ping999',
    moment: 'Вирусный фонк-ремикс на звук переподключения роутера во время клатча.',
    voteShare: '46.2%',
  },
  {
    year: '2024',
    category: 'Король кринжа',
    winner: 'Виктор Оффлайн',
    handle: '@victor_off',
    moment: 'Пришёл на премию в костюме «Синий экран смерти» и произнёс речь на языке кодов ошибок.',
    voteShare: '39.5%',
  },
  {
    year: '2024',
    category: 'Коллаб года',
    winner: 'Трио «Без ТЗ»',
    handle: '@bez_tz',
    moment: 'Готовили пиццу втроём в одной кухне, не договариваясь о рецепте — получилось тесто с маршмеллоу.',
    voteShare: '34.9%',
  },
];

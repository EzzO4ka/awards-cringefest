import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_CATEGORIES, type AwardCategory, type Nominee } from './src/data/awardsData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Deep clone seed data into in-memory server store
const categoriesStore: AwardCategory[] = structuredClone(INITIAL_CATEGORIES);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/nominations', (_req, res) => {
  res.json({ categories: categoriesStore });
});

app.post('/api/vote', (req, res) => {
  const { categoryId, nomineeId, previousNomineeId } = req.body as {
    categoryId?: string;
    nomineeId?: string;
    previousNomineeId?: string | null;
  };

  if (!categoryId || !nomineeId) {
    return res.status(400).json({ error: 'Не указаны категория или номинант.' });
  }

  const category = categoriesStore.find((c) => c.id === categoryId);
  if (!category) {
    return res.status(404).json({ error: 'Номинация не найдена.' });
  }

  const targetNominee = category.nominees.find((n) => n.id === nomineeId);
  if (!targetNominee) {
    return res.status(404).json({ error: 'Номинант не найден.' });
  }

  if (previousNomineeId && previousNomineeId !== nomineeId) {
    const prev = category.nominees.find((n) => n.id === previousNomineeId);
    if (prev && prev.votes > 0) {
      prev.votes -= 1;
    }
  }

  if (previousNomineeId !== nomineeId) {
    targetNominee.votes += 1;
  }

  return res.json({ category });
});

app.post('/api/unvote', (req, res) => {
  const { categoryId, nomineeId } = req.body as {
    categoryId?: string;
    nomineeId?: string;
  };

  if (!categoryId || !nomineeId) {
    return res.status(400).json({ error: 'Не указаны категория или номинант.' });
  }

  const category = categoriesStore.find((c) => c.id === categoryId);
  if (!category) {
    return res.status(404).json({ error: 'Номинация не найдена.' });
  }

  const targetNominee = category.nominees.find((n) => n.id === nomineeId);
  if (targetNominee && targetNominee.votes > 0) {
    targetNominee.votes -= 1;
  }

  return res.json({ category });
});

app.post('/api/propose', (req, res) => {
  const { categoryId, nomineeName, handle, platform, momentTitle, description, clipUrl } =
    req.body as {
      categoryId?: string;
      nomineeName?: string;
      handle?: string;
      platform?: string;
      momentTitle?: string;
      description?: string;
      clipUrl?: string;
    };

  if (!categoryId || !nomineeName?.trim() || !momentTitle?.trim()) {
    return res.status(400).json({
      error: 'Заполните категорию, имя номинанта и название момента.',
    });
  }

  const category = categoriesStore.find((c) => c.id === categoryId);
  if (!category) {
    return res.status(404).json({ error: 'Выбранная категория не найдена.' });
  }

  const normalizedHandle = handle?.trim()
    ? handle.trim().startsWith('@')
      ? handle.trim()
      : `@${handle.trim()}`
    : '@community_pick';

  const newNominee: Nominee = {
    id: `custom-${Date.now()}`,
    name: nomineeName.trim().slice(0, 60),
    handle: normalizedHandle.slice(0, 40),
    platform: (platform?.trim() || 'Twitch / YouTube').slice(0, 32),
    momentTitle: momentTitle.trim().slice(0, 90),
    description:
      description?.trim().slice(0, 220) ||
      'Выдвинуто зрителями в открытом этапе народного отбора Awards Cringefest 2026.',
    votes: 1,
    accentTone: '#FF2E4C',
    isCommunity: true,
    clipUrl: clipUrl?.trim() || undefined,
  };

  category.nominees.push(newNominee);

  return res.status(201).json({ nominee: newNominee, category });
});

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`Awards Cringefest server running at http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

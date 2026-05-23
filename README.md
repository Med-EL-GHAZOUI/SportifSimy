# SportifSimy

Application SaaS de suivi sportif entre coachs et clients, construite avec Next.js App Router, PostgreSQL, Prisma, JWT, bcrypt, Zod, Tailwind CSS, shadcn-style UI et Recharts.

## Architecture

- `app/` : pages App Router et routes REST `app/api/*`
- `components/` : composants UI reutilisables
- `lib/` : Prisma, auth JWT, validation, securite, Cloudinary
- `services/` : logique metier coach/client/programmes/nutrition
- `prisma/` : schema relationnel et seed
- `types/` : types partages
- `middleware.ts` : protection des routes client, coach et API

## Modules inclus

- Authentification JWT avec cookie HTTP-only
- Hash bcrypt des mots de passe
- Roles `COACH` et `CLIENT`
- Creation client reservee au coach
- Isolation des donnees par coach/client
- Programmes, seances, exercices
- Plans nutritionnels et repas
- Check-ins avec upload Cloudinary JPG/PNG jusqu'a 5MB
- Dashboard coach/client
- Historique check-ins et graphique Recharts d'evolution du poids
- Seed de demonstration
- Docker et PostgreSQL local

## Installation locale

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

## Installation avec PostgreSQL local / pgAdmin 4

Lancez PostgreSQL depuis votre installation locale, puis exécutez :

```bash
npm install
npm run setup:pgadmin
npm run dev
```

Le script demande l'utilisateur PostgreSQL, le mot de passe et crée automatiquement la base `ss_2026` si elle n'existe pas.

Comptes seed :

- Coach : `coach@ss2026.test` / `Coach@2026`
- Client : `client@ss2026.test` / `Client@2026`

## Variables d'environnement

```env
DATABASE_URL="postgresql://ss2026:ss2026@localhost:5433/SportifSimy"
JWT_SECRET="replace-with-a-long-random-secret"
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Docker

```bash
docker compose up --build
```

Puis, dans un autre terminal :

```bash
docker compose exec app npx prisma migrate deploy
docker compose exec app npm run prisma:seed
```

## Deploiement Vercel + Neon

1. Creer une base Neon PostgreSQL.
2. Ajouter `DATABASE_URL`, `JWT_SECRET` et les variables Cloudinary dans Vercel.
3. Lancer `npx prisma migrate deploy` pendant le deploiement ou via un job separe.
4. Deployer le projet sur Vercel.

## Prochaines etapes recommandees

- Ajouter les ecrans CRUD complets en composants client avec React Hook Form.
- Ajouter un flux email pour reset password.
- Ajouter tests API et tests d'autorisation.
- Ajouter presigned uploads ou signature Cloudinary cote serveur pour les uploads avances.
# SportifSimy

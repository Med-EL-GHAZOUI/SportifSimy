import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import pg from "pg";

const { Client } = pg;

const rl = createInterface({ input, output });

function quoteIdentifier(value) {
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value)) {
    throw new Error("Nom de base invalide. Utilisez seulement lettres, chiffres et underscore.");
  }
  return `"${value}"`;
}

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit", shell: true });
  if (result.status !== 0) {
    throw new Error(`Commande échouée: ${command} ${args.join(" ")}`);
  }
}

function updateEnv(databaseUrl) {
  const envPath = ".env";
  const current = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";
  const lines = current
    .split(/\r?\n/)
    .filter((line) => line.trim() && !line.startsWith("DATABASE_URL="));

  lines.unshift(`DATABASE_URL="${databaseUrl}"`);

  if (!lines.some((line) => line.startsWith("JWT_SECRET="))) {
    lines.push('JWT_SECRET="local-development-secret-ss-2026-change-before-production"');
  }
  if (!lines.some((line) => line.startsWith("CLOUDINARY_CLOUD_NAME="))) lines.push('CLOUDINARY_CLOUD_NAME=""');
  if (!lines.some((line) => line.startsWith("CLOUDINARY_API_KEY="))) lines.push('CLOUDINARY_API_KEY=""');
  if (!lines.some((line) => line.startsWith("CLOUDINARY_API_SECRET="))) lines.push('CLOUDINARY_API_SECRET=""');
  if (!lines.some((line) => line.startsWith("NEXT_PUBLIC_APP_URL="))) lines.push('NEXT_PUBLIC_APP_URL="http://localhost:3000"');

  writeFileSync(envPath, `${lines.join("\n")}\n`);
}

try {
  console.log("\nConfiguration PostgreSQL local / pgAdmin 4 pour SS_2026\n");

  const host = (await rl.question("Host PostgreSQL [localhost]: ")) || "localhost";
  const port = Number((await rl.question("Port PostgreSQL [5432]: ")) || "5432");
  const adminUser = (await rl.question("Utilisateur PostgreSQL [postgres]: ")) || "postgres";
  const adminPasswordInput = await rl.question("Mot de passe PostgreSQL: ");
  const adminPassword = String(adminPasswordInput ?? "");
  const databaseName = (await rl.question("Nom de la base [ss_2026]: ")) || "ss_2026";

  const adminClient = new Client({
    host,
    port,
    user: adminUser,
    password: adminPassword,
    database: "postgres"
  });

  await adminClient.connect();
  const exists = await adminClient.query("SELECT 1 FROM pg_database WHERE datname = $1", [databaseName]);

  if (exists.rowCount === 0) {
    await adminClient.query(`CREATE DATABASE ${quoteIdentifier(databaseName)}`);
    console.log(`Base créée: ${databaseName}`);
  } else {
    console.log(`Base déjà existante: ${databaseName}`);
  }

  await adminClient.end();

  const encodedUser = encodeURIComponent(adminUser);
  const encodedPassword = encodeURIComponent(adminPassword);
  const databaseUrl = `postgresql://${encodedUser}:${encodedPassword}@${host}:${port}/${databaseName}`;

  updateEnv(databaseUrl);
  console.log(".env mis à jour avec DATABASE_URL.");

  run("npx", ["prisma", "db", "push"]);
  run("npm", ["run", "prisma:seed"]);

  console.log("\nSetup terminé. Lancez maintenant: npm run dev\n");
} catch (error) {
  console.error("\nErreur setup PostgreSQL:");
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("password authentication failed") || message.includes("SASL")) {
    console.error("Authentification PostgreSQL refusée. Entrez le même mot de passe que celui utilisé dans pgAdmin 4 pour l'utilisateur choisi.");
  } else {
    console.error(message);
  }
  process.exitCode = 1;
} finally {
  rl.close();
}

import knex, { Knex } from 'knex';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dockerComposePath = path.resolve(__dirname, '../docker-compose.yml');
const dockerCompose = parse(readFileSync(dockerComposePath, 'utf-8'));

const postgresConfig = {
  port: dockerCompose.services.db.ports[0].replace(/:.*/, ''),
  user: dockerCompose.services.db.environment.POSTGRES_USER,
  password: dockerCompose.services.db.environment.POSTGRES_PASSWORD,
  database: dockerCompose.services.db.environment.POSTGRES_DB
};

console.log(`Got postgres config from ${dockerComposePath} file`);
console.table(postgresConfig);

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      ...postgresConfig
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};

async function runMigrationsAndSeeds() {
  const db = knex(config.development);
  try {
    console.log('Running migrations...');
    await db.migrate.latest();

    console.log('Running seeds...');
    await db.seed.run();
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    await db.destroy();
  }
}

runMigrationsAndSeeds()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));

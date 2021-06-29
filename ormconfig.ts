/* eslint-disable prettier/prettier */
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

/* eslint-disable prettier/prettier */
const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/src/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};
export default config;

import type { Database } from 'better-sqlite3';
import type { Redis } from 'ioredis';
import { Campaign } from './campaign';

export type RunMigration = () => void;

export function runSqliteMigrationsFactory(conn: Database, migrations: string[]): RunMigration {
  return function () {
    for (const migration of migrations) {
      conn.exec(migration);
    }
  };
}

export function runRedisMigrationsFactory(redisClient: Redis, migrations: Campaign[]): RunMigration {
  return function () {
    for (const migration of migrations) {
      redisClient.hset(`{${migration.publisher}}:campaigns`, migration.id, JSON.stringify(migration));
    }
  };
}

export const redisMigrations = [
  {id: 'rev-1', publisher: 'rev', data: '{"creative": "banner", "bid": 0.5}'},
  {id: 'rev-2', publisher: 'rev', data: '{"creative": "banner", "bid": 0.6}'},
  {id: 'rev-3', publisher: 'rev', data: '{"creative": "banner", "bid": 0.7}'},
  {id: 'rev-4', publisher: 'rev', data: '{"creative": "banner", "bid": 0.8}'},
  {id: 'rev-5', publisher: 'rev', data: '{"creative": "banner", "bid": 1.5}'},
  {id: 'rev-6', publisher: 'rev', data: '{"creative": "banner", "bid": 0.9}'},
  {id: 'rev-7', publisher: 'rev', data: '{"creative": "banner", "bid": 0.5}'},
  {id: 'rev-8', publisher: 'rev', data: '{"creative": "banner", "bid": 0.5}'},
  {id: 'rev-9', publisher: 'rev', data: '{"creative": "banner", "bid": 0.5}'},
  {id: 'rev-10', publisher: 'rev', data: '{"creative": "banner", "bid": 0.5}'},
  {id: 'rev-11', publisher: 'rev', data: '{"creative": "banner", "bid": 0.4}'},
  {id: 'rev-12', publisher: 'rev', data: '{"creative": "banner", "bid": 0.5}'},
  {id: 'rev-13', publisher: 'rev', data: '{"creative": "banner", "bid": 1.0}'},
  {id: 'rev-14', publisher: 'rev', data: '{"creative": "banner", "bid": 2.0}'},
  {id: 'rev-15', publisher: 'rev', data: '{"creative": "banner", "bid": 2.5}'},
  {id: 'sft-1', publisher: 'sft', data: '{"creative": "videos", "bid": 1.7}'},
  {id: 'sft-2', publisher: 'sft', data: '{"creative": "videos", "bid": 2.7}'},
  {id: 'sft-3', publisher: 'sft', data: '{"creative": "videos", "bid": 3.7}'},
  {id: 'sft-4', publisher: 'sft', data: '{"creative": "videos", "bid": 4.7}'},
  {id: 'sft-5', publisher: 'sft', data: '{"creative": "videos", "bid": 5.7}'},
  {id: 'sft-6', publisher: 'sft', data: '{"creative": "videos", "bid": 6.7}'},
  {id: 'sft-7', publisher: 'sft', data: '{"creative": "videos", "bid": 7.7}'},
  {id: 'sft-8', publisher: 'sft', data: '{"creative": "videos", "bid": 8.7}'},
  {id: 'sft-9', publisher: 'sft', data: '{"creative": "videos", "bid": 9.7}'},
  {id: 'sft-10', publisher: 'sft', data: '{"creative": "videos", "bid": 8.7}'},
  {id: 'sft-11', publisher: 'sft', data: '{"creative": "videos", "bid": 7.7}'},
  {id: 'sft-12', publisher: 'sft', data: '{"creative": "videos", "bid": 6.7}'},
  {id: 'sft-13', publisher: 'sft', data: '{"creative": "videos", "bid": 5.7}'},
  {id: 'sft-14', publisher: 'sft', data: '{"creative": "videos", "bid": 4.7}'},
  {id: 'sft-15', publisher: 'sft', data: '{"creative": "videos", "bid": 3.7}'},
  {id: 'fhp-1', publisher: 'fhp', data: '{"creative": "native", "bid": 10.7}'},
  {id: 'fhp-2', publisher: 'fhp', data: '{"creative": "native", "bid": 11.7}'},
  {id: 'fhp-3', publisher: 'fhp', data: '{"creative": "native", "bid": 12.7}'},
  {id: 'fhp-4', publisher: 'fhp', data: '{"creative": "native", "bid": 13.7}'},
  {id: 'fhp-5', publisher: 'fhp', data: '{"creative": "native", "bid": 14.7}'},
  {id: 'fhp-6', publisher: 'fhp', data: '{"creative": "native", "bid": 15.7}'},
  {id: 'fhp-7', publisher: 'fhp', data: '{"creative": "native", "bid": 16.7}'},
  {id: 'fhp-8', publisher: 'fhp', data: '{"creative": "native", "bid": 17.7}'},
  {id: 'fhp-9', publisher: 'fhp', data: '{"creative": "native", "bid": 18.7}'},
  {id: 'fhp-10', publisher: 'fhp', data: '{"creative": "native", "bid": 19.7}'},
  {id: 'fhp-11', publisher: 'fhp', data: '{"creative": "native", "bid": 18.7}'},
  {id: 'fhp-12', publisher: 'fhp', data: '{"creative": "native", "bid": 17.7}'},
  {id: 'fhp-13', publisher: 'fhp', data: '{"creative": "native", "bid": 16.7}'},
  {id: 'fhp-14', publisher: 'fhp', data: '{"creative": "native", "bid": 15.7}'},
  {id: 'fhp-15', publisher: 'fhp', data: '{"creative": "native", "bid": 14.7}'},
] as Campaign[];

export const sqliteMigrations = [
  `
    CREATE TABLE IF NOT EXISTS campaigns
    (
      id TEXT PRIMARY KEY NOT NULL,
      publisher TEXT NOT NULL,
      data TEXT NOT NULL
    );
  `,
  `
    INSERT INTO campaigns (id, publisher, data) VALUES
      ('rev-1', 'rev', '{"creative": "banner", "bid": 0.5}'),
      ('rev-2', 'rev', '{"creative": "banner", "bid": 0.6}'),
      ('rev-3', 'rev', '{"creative": "banner", "bid": 0.7}'),
      ('rev-4', 'rev', '{"creative": "banner", "bid": 0.8}'),
      ('rev-5', 'rev', '{"creative": "banner", "bid": 1.5}'),
      ('rev-6', 'rev', '{"creative": "banner", "bid": 0.9}'),
      ('rev-7', 'rev', '{"creative": "banner", "bid": 0.5}'),
      ('rev-8', 'rev', '{"creative": "banner", "bid": 0.5}'),
      ('rev-9', 'rev', '{"creative": "banner", "bid": 0.5}'),
      ('rev-10', 'rev', '{"creative": "banner", "bid": 0.5}'),
      ('rev-11', 'rev', '{"creative": "banner", "bid": 0.4}'),
      ('rev-12', 'rev', '{"creative": "banner", "bid": 0.5}'),
      ('rev-13', 'rev', '{"creative": "banner", "bid": 0.7}'),
      ('rev-14', 'rev', '{"creative": "banner", "bid": 0.6}'),
      ('rev-15', 'rev', '{"creative": "banner", "bid": 2.5}'),
      ('sft-1', 'sft', '{"creative": "videos", "bid": 1.7}'),
      ('sft-2', 'sft', '{"creative": "videos", "bid": 2.7}'),
      ('sft-3', 'sft', '{"creative": "videos", "bid": 3.7}'),
      ('sft-4', 'sft', '{"creative": "videos", "bid": 4.7}'),
      ('sft-5', 'sft', '{"creative": "videos", "bid": 5.7}'),
      ('sft-6', 'sft', '{"creative": "videos", "bid": 6.7}'),
      ('sft-7', 'sft', '{"creative": "videos", "bid": 7.7}'),
      ('sft-8', 'sft', '{"creative": "videos", "bid": 8.7}'),
      ('sft-9', 'sft', '{"creative": "videos", "bid": 9.7}'),
      ('sft-10', 'sft', '{"creative": "videos", "bid": 8.7}'),
      ('sft-11', 'sft', '{"creative": "videos", "bid": 7.7}'),
      ('sft-12', 'sft', '{"creative": "videos", "bid": 6.7}'),
      ('sft-13', 'sft', '{"creative": "videos", "bid": 5.7}'),
      ('sft-14', 'sft', '{"creative": "videos", "bid": 4.7}'),
      ('sft-15', 'sft', '{"creative": "videos", "bid": 3.7}'),
      ('fhp-1', 'fhp', '{"creative": "native", "bid": 10.7}'),
      ('fhp-2', 'fhp', '{"creative": "native", "bid": 11.7}'),
      ('fhp-3', 'fhp', '{"creative": "native", "bid": 12.7}'),
      ('fhp-4', 'fhp', '{"creative": "native", "bid": 13.7}'),
      ('fhp-5', 'fhp', '{"creative": "native", "bid": 14.7}'),
      ('fhp-6', 'fhp', '{"creative": "native", "bid": 15.7}'),
      ('fhp-7', 'fhp', '{"creative": "native", "bid": 16.7}'),
      ('fhp-8', 'fhp', '{"creative": "native", "bid": 17.7}'),
      ('fhp-9', 'fhp', '{"creative": "native", "bid": 18.7}'),
      ('fhp-10', 'fhp', '{"creative": "native", "bid": 19.7}'),
      ('fhp-11', 'fhp', '{"creative": "native", "bid": 18.7}'),
      ('fhp-12', 'fhp', '{"creative": "native", "bid": 17.7}'),
      ('fhp-13', 'fhp', '{"creative": "native", "bid": 16.7}'),
      ('fhp-14', 'fhp', '{"creative": "native", "bid": 15.7}'),
      ('fhp-15', 'fhp', '{"creative": "native", "bid": 14.7}');
  `,
];

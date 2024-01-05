import 'server-only';

import { type DB } from '@/core/types/db-types';
import { Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

export const queryBuilder = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
});
import Knex from 'knex';
import knexfile from '../../knexfile.cjs';
import { config } from 'dotenv';

config();

const environment = process.env.NODE_ENV === 'production' ? knexfile.production : knexfile.development;
const knex = Knex(environment);

export default knex;

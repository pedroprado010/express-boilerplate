import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // await knex('users').del();

  // await knex('users').insert([
  //   {
  //     id: knex.raw('uuid_generate_v4()'),
  //     name: 'Alice',
  //     email: 'alice@example.com',
  //   },
  //   {
  //     id: knex.raw('uuid_generate_v4()'),
  //     name: 'Bob',
  //     email: 'bob@example.com',
  //   },
  // ]);
}

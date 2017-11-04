
exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('firebase_uid');
      table.string('email');
      table.string('slack_id');
      table.string('grade');
      table.string('skill_level');
      table.integer('training_as_padawan_with_jedi_attempted');
      table.integer('training_as_padawan_with_jedi_success');
      table.integer('training_as_jedi_with_jedi_attempted');
      table.integer('training_as_jedi_with_jedi_success');
      table.integer('training_as_jedi_with_padawan_attempted');
      table.integer('training_as_jedi_with_padawan_success');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('training', table => {
      table.increments('id').primary();
      table.integer('appprentice_user_id').unsigned();
      table.foreign('appprentice_user_id').references('users.id');
      table.integer('mentor_user_id').unsigned();
      table.foreign('mentor_user_id').references('users.id');
      table.dateTime('scheduled_for_date');
      table.string('location');
      table.json('topics');
      table.string('status');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('feedback', table => {
      table.increments('id').primary();
      table.integer('from_user_id').unsigned();
      table.foreign('from_user_id').references('users.id');
      table.string('from_user_skill_level');
      table.integer('to_user_id').unsigned();
      table.foreign('to_user_id').references('users.id');
      table.string('to_user_skill_level');
      table.string('message');
      table.integer('training_id').unsigned();
      table.foreign('training_id').references('training.id');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('topics', table => {
      table.increments('id').primary();
      table.string('parent');
      table.string('name');
      table.timestamps(true, true);
    })

  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('topics'),
    knex.schema.dropTable('feedback'),
    knex.schema.dropTable('training'),
    knex.schema.dropTable('users')
  ]);
};
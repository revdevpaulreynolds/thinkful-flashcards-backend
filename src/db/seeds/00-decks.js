
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('decks').del()
    .then(function () {
      // Inserts seed entries
      return knex('decks').insert([
        {name: 'Study Cards', description: 'Cards to study for backend interview'},
      ]);
    });
};

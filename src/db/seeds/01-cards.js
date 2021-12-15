
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cards').del()
    .then(function () {
      // Inserts seed entries
      return knex('cards').insert([
        {front: 'This is the front', back: 'and this is the back', deckId: 1},
      ]);
    });
};


exports.up = function(knex) {
  return knex.schema.createTable("cards", (table) => {
      table.increments("product_id").primary();
      table.text("front");
      table.text("back");
      table.integer("deckId").unsigned().notNullable();
      table
        .foreign("deckId")
        .references("id")
        .inTable("decks")
        .onDelete("cascade");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("cards");
};

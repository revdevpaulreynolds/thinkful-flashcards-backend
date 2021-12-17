
exports.up = function(knex) {
  return knex.schema.table("cards", (table) => {
      table.renameColumn("product_id", "id")
  })
};

exports.down = function(knex) {
  return knex.schema.table("cards", (table) => {
      table.renameColumn("id", "product_id");
  })
};

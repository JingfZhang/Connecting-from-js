
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("milestones", function(table){
      table.integer("foreign_person_id");
      table.foreign("foreign_person_id").references("famous_people.id");
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("milestones", function(table){
      table.dropColumn("foreign_person_id");
    })
  ])
};
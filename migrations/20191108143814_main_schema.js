
exports.up = function(knex) {
    return knex.schema
        .createTable('quality_attributes', function (t) {
            t.increments('id').primary();
            t.string('name').notNullable();
        })
        .createTable('modifications_pattern_tactic', function(t) {
            t.increments('id').primary();
            t.string('name').notNullable();
        })
        .createTable('tactics', function(t) {
            t.increments('id').primary();
            t.string('name').notNullable();
            t.integer('quality_attribute_id').unsigned().references('id').inTable('quality_attributes').notNullable().onDelete('cascade');
        })
        .createTable('patterns', function (t) {
            t.increments('id').primary();
            t.string('name').notNullable();
        })
        .createTable('tactic_pattern', function (t) {
            t.increments('id').primary();
            t.integer('pattern_id').unsigned().references('id').inTable('patterns').notNullable().onDelete('cascade');
            t.integer('tactic_id').unsigned().references('id').inTable('tactics').notNullable();
            t.integer('modification_type_id').unsigned().references('id').inTable('modifications_pattern_tactic').notNullable().onDelete('cascade').defaultTo(1);
        })
        .createTable('required_attributes', function (t) {
            t.increments('id').primary();
            t.integer('quality_attribute_id').unsigned().references('id').inTable('quality_attributes').notNullable().onDelete('cascade');
            t.string('name');
        });

};

exports.down = function(knex) {
    return knex.schema
        .dropTable('tactic_pattern')
        .dropTable('modifications_pattern_tactic')
        .dropTable('required_attributes')
        .dropTable('patterns')
        .dropTable('tactics')
        .dropTable('quality_attributes')
};

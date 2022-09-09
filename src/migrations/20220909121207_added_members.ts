import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    return knex.schema.createTable("members", (table) => {
        table.increments("id", { primaryKey: true });
        table.string("name").notNullable();
        table.boolean("visible").defaultTo(false);
        table.string('user_email').nullable();
        table.timestamps({ defaultToNow: true, useTimestamps: true });
    });

};


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("members");
};


import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {

    return knex.schema.createTable("users", (table) => {
        table.increments("id", { primaryKey: true });
        table.string("email").notNullable();
        table.string("password").notNullable();
        table.enum("role", ["admin", "user"], { enumName: "Role", useNative: true });
        table.timestamps({ defaultToNow: true, useTimestamps: true });
    });

};


export async function down(knex: Knex): Promise<void> {

    return knex.schema.dropTable("users");
    
};


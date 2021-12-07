import * as Knex from "knex";
import { timestamps } from "../helpers";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users',(table)=>{
        table.bigIncrements('id').index().notNullable();
        table.uuid('uuid');
        table.integer('role');
        table.integer('status');
        table.string('email').unique();
        table.string('password');
        table.string('name');
        timestamps(knex, table);
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('users');
}
import * as Knex from "knex";
import { timestamps } from "../helpers";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('venues',(table)=>{
        table.bigIncrements('id').index().notNullable();
        table.uuid('uuid');
        table.string('name');
        table.string('company_name');
        table.string('company_address');
        table.string('gst');
        table.string('pan');
        table.bigInteger('account_number');
        table.string('branch_address');
        table.string('bank_ifsc');
        table.string('bank_name');
        table.string('admin_name');
        table.string('admin_email');
        table.integer('admin_phone');
        timestamps(knex, table);
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('venues');
}
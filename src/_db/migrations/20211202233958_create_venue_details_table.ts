import * as Knex from "knex";
import { timestamps } from "../helpers";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('venue_details',(table)=>{
        table.bigIncrements('id').index().notNullable();
        table.uuid('uuid');
        table.bigInteger('venue_id');
        table.string('date');
        table.float('pay_at_venue')
        table.float('hudle_wallet');
        table.float('venue_wallet');
        table.float('hudle_passes');
        table.float('hudle_discount');
        table.float('venue_discount');
        table.float('online_paid_amount');
        table.float('payment_gateway_charge');
        table.float('hudle_commission');
        table.float('tds');
        table.float('tcs');
        table.float('total_amount_settled');
        table.float('hudle_pass_amount_settled');
        table.float('commission_invoice');
        table.float('hudle_pass_invoice');
        table.float('subscription_invoice');
      
        timestamps(knex, table);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('venue_details')
}


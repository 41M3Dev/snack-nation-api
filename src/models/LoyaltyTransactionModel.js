const BaseModel = require('./BaseModel');

class LoyaltyTransactionModel extends BaseModel {
    constructor() {
        super('loyalty_transactions');
    }

    findByCustomer(customerId) {
        return this.db(this.tableName)
            .where({ customer_id: customerId })
            .orderBy('created_at', 'desc');
    }

    async createTransaction({ customer_id, order_id, reward_id, type, points, description, created_by }) {
        return this.db.transaction(async (trx) => {
            const customer = await trx('customers').where({ id: customer_id }).first();

            if (!customer) {
                throw new Error('Client non trouvé');
            }

            // 'redeem' retire toujours des points, 'adjust' garde le signe fourni
            // (ajout ou retrait manuel), 'earn' ajoute toujours des points.
            let delta;
            if (type === 'redeem') {
                delta = -Math.abs(points);
            } else if (type === 'adjust') {
                delta = points;
            } else {
                delta = Math.abs(points);
            }


            const balanceAfter = customer.points_balance + delta;

            if (balanceAfter < 0) {
                throw new Error('Solde de points insuffisant');
            }

            await trx('customers').where({ id: customer_id }).update({ points_balance: balanceAfter });

            const [id] = await trx(this.tableName).insert({
                customer_id,
                order_id: order_id || null,
                reward_id: reward_id || null,
                type,
                points: delta,
                balance_after: balanceAfter,
                description: description || null,
                created_by: created_by || null,
            });

            return trx(this.tableName).where({ id }).first();
        });
    }
}
module.exports = new LoyaltyTransactionModel();

const db = require('./connection');
const middlewares = require('../middlewares/middlewares');

const salesModels = {
  checkIfExists: async (id) => {
    const sql = `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
FROM  StoreManager.sales_products AS sp
INNER JOIN StoreManager.sales AS s
ON sp.sale_id = s.id
WHERE id = ?`;
    const [[sale]] = await db.query(sql, [id]);
    if (sale) {
      return sale;
    }
  },

  getAll: async () => {
    const sql = `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
FROM  StoreManager.sales_products AS sp
INNER JOIN StoreManager.sales AS s
ON sp.sale_id = s.id;`;
    const [result] = await db.query(sql);
    if (result) {
      const formatedResult = await result.map((e) => middlewares.formatSales(e));
      return formatedResult;
    }
    return result;
  },

  findById: async (id) => {
    const sql = `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
FROM  StoreManager.sales_products AS sp
INNER JOIN StoreManager.sales AS s
ON sp.sale_id = s.id
WHERE id = ?`;
    const [result] = await db.query(sql, [id]);
    if (result.length > 1) {
      const formatedResult = await result.map((e) => middlewares.formatSale(e));
      return formatedResult;
    }
    if (result.length === 1) {
      const formatedSale = middlewares.formatSale(result[0]);
      return formatedSale;
    }
  },

  create: async (sales) => {
    const querySalesProducts = `
    INSERT INTO
      StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES
      (?, ?, ?)`;

    const querySales = `
    INSERT INTO
      StoreManager.sales (id, date)
    VALUES
      (default, default)`;

    const [resultSale] = await db.query(querySales);

    await sales.forEach(async (sale) => {
      const { productId, quantity } = sale;
      await db.query(querySalesProducts, [resultSale.insertId, productId, quantity]);
    });

    return resultSale;
  },
};

module.exports = salesModels;
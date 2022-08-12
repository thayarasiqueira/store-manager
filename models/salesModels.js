const db = require('./connection');
const middlewares = require('../middlewares/middlewares');

const salesModels = {
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

  // create: async (sales) => {
  //   const { productId, quantity } = sales;
  //     const sql = `INSERT INTO StoreManager.sales (productId, quantity) VALUES (?, ?)
  //     INSERT INTO StoreManager.sales_products (productId, quantity) VALUES (?, ?)`;
  //     const [newSale] = await db.query(sql, [productId, quantity]);
  //     return { id: newSale.insertId, productId, quantity };
  // },
};

module.exports = salesModels;
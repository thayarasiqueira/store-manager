const db = require('./connection');

const productsModels = {
  getAll: async () => {
    const sql = 'SELECT * FROM StoreManager.products';
    const [result] = await db.query(sql);
    return result;
  },

  findById: async (id) => {
    const sql = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [[result]] = await db.query(sql, [id]);
    return result;
  },

  create: async (product) => {
    const sql = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [newProduct] = await db.query(sql, [product]);
    return { id: newProduct.insertId, name: product };
  },
};

module.exports = productsModels;
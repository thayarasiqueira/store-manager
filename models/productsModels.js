const db = require('./connection');

const productsModels = {
  checkIfExists: async (id) => {
    const sql = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [[product]] = await db.query(sql, [id]);
    if (product) {
      return product;
    }
  },

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

  update: async (name, id) => {
    const sql = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
    await db.query(sql, [name, id]);
    const sql2 = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [[result]] = await db.query(sql2, [id]);
    return result;
  },

  delete: async (id) => {
    const sql = 'DELETE FROM products WHERE id = ?';
    await db.query(sql, [id]);
  },
};

module.exports = productsModels;
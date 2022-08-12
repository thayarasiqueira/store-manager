const middlewares = {
  formatSales: ({ sale_id: saleId, date, product_id: productId, quantity }) => {
    const formatedSales = {
      saleId,
      date,
      productId,
      quantity,
    };
    return formatedSales;
  },
  
  formatSale: ({ date, product_id: productId, quantity }) => {
    const formatedSales = {
      date,
      productId,
      quantity,
    };
    return formatedSales;
  },
};

module.exports = middlewares;

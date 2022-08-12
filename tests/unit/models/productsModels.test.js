const sinon = require("sinon");
const { expect } = require("chai");
const productsModel = require("../../../models/productsModels");
const connection = require("../../../models/connection");

describe(`Testing the products' model layer `, () => {
  describe('Listing all products', () => {
    before(() => {
      const execute = [
        { id: 1, name: 'product_name' },
        { id: 2, name: 'product_name2' },
      ];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });
    it('should return a list with all products containing "id" and "name"', async () => {
      const response = await productsModel.getAll();

      expect(response).to.be.a('array');
      expect(response[0]).to.have.a.property('id');
      expect(response[0]).to.have.a.property('name');
    })
  })

  describe('Finding a product by its id', () => {
    before(() => {
      const execute =
        {
          id: 2,
          name: 'product_name',
        };

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('should return one product containing "id" and "name"', async () => {
      const id = 2;
      const response = await productsModel.findById(id);

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
    });
  })
  describe('Creating a product', async () => {
    before(() => {
      const execute = [{ id: 6 }];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('should return a product "id" inserted', async () => {
      const response = await productsModel.create('name_example');

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('id');
    });
  });
})
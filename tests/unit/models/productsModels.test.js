const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../models/connection");
const productsModels = require("../../../models/productsModels");

describe(`Testing the products' models layer `, () => {
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
      const response = await productsModels.getAll();

      expect(response).to.be.a('array');
      expect(response[0]).to.have.a.property('id');
      expect(response[0]).to.have.a.property('name');
    })
  })

  describe('Finding a product by its id', () => {
    before(async () => {
      const execute = [[]];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    describe('when the id does not exist in the db',async () => {
      const response = await productsModels.findById(78);
      expect(response).to.be.equal(undefined);
    });
  
      before(() => {
        sinon.stub(productsModels, 'findById')
          .resolves(
            {
              id: 1,
              name: 'name_example',
            }
          );
      });

      after(() => {
        productsModels.findById.restore();
      });

      it('returns an object', async () => {
        const response = await productsModels.findById(1);

        expect(response).to.be.an('object');
      });

      it('does not return an empty object', async () => {
        const response = await productsModels.findById(1);

        expect(response).to.be.not.empty;
      });

      it('contains the keys "id" and "name"', async () => {
        const item = await productsModels.findById(1);

        expect(item).to.include.all.keys('id', 'name');
      });
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
        const response = await productsModels.create('name_example');

        expect(response).to.be.a('object');
        expect(response).to.have.a.property('name');
        expect(response).to.have.a.property('id');
      });
    });
const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');

const productsServices = require('../../../services/productsServices');
const productsModels = require('../../../models/productsModels');

describe(`Testing the products' services layer`, () => {
  describe('Listing all products', () => {
    before(() => {
      sinon.stub(productsModels, "getAll").resolves([]);
    });

    after(() => {
      productsModels.getAll.restore();
    });

    it('it returns an array', async () => {
      const response = await productsModels.getAll();

      expect(response).to.be.a('array');
    })

    it('the array must be empty', async () => {
      const response = await productsModels.getAll();

      expect(response).to.be.empty;
    })
  })

  describe('Listing one product by its id', () => {
    describe('if it does not exist', () => {
      before(() => {
        sinon.stub(productsModels, 'findById').resolves([{}]);
      });

      after(() => {
        productsModels.findById.restore();
      });

      it('returns an object', async () => {
        const [result] = await productsServices.findById(78);
        expect(result).to.be.an('object');
      });

      it('returns an empty object', async () => {
        const [result] = await productsServices.findById(78);
        expect(result).to.be.empty;
      });
    });
  });
  // describe('Inserts a new product in the db', () => {
  //   before(() => {
  //     const execute = {};

  //     sinon.stub(connection, 'execute').resolves(execute);
  //   });

  //   after(() => {
  //     connection.execute.restore();
  //   });

  //   it('', async () => {
  //     const response = await productsServices.validateName();

  //     expect(response).to.throw(Error).with.property('message', 'Column "name" cannot be null');
  //     expect(response).not.to.be.a('object');
  //   });

  //   it('when "name" has not the minimun lentgh', async () => {
  //     const response = await productsServices.validateName('name');

  //     expect(response).to.throw(Error).with.property('message', '"name" length must be at least 5 characters long');
  //   });
  // });
});

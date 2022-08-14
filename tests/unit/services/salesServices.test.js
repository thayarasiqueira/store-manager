const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');

const salesServices = require('../../../services/salesServices');
const salesModels = require('../../../models/salesModels');

describe(`Testing the products' services layer`, () => {
  describe('Listing all products', () => {
    before(() => {
      sinon.stub(salesModels, "getAll").resolves([]);
    });

    after(() => {
      salesModels.getAll.restore();
    });

    it('it returns an array', async () => {
      const response = await salesModels.getAll();

      expect(response).to.be.a('array');
    })

    it('the array must be empty', async () => {
      const response = await salesModels.getAll();

      expect(response).to.be.empty;
    })
  })

  describe('Listing one product by its id', () => {
    describe('if it does not exist', () => {
      before(() => {
        sinon.stub(salesModels, 'findById').resolves([{}]);
      });

      after(() => {
        salesModels.findById.restore();
      });

      it('returns an object', async () => {
        const [result] = await salesServices.findById(78);
        expect(result).to.be.an('object');
      });

      it('returns an empty object', async () => {
        const [result] = await salesServices.findById(78);
        expect(result).to.be.empty;
      });
    });
  });
});
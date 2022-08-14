const sinon = require("sinon");
const { expect } = require("chai");
const mocks = require("../../../__tests__/_dataMock");
const salesControllers = require("../../../controllers/salesControllers");
const salesServices = require("../../../services/salesServices");


describe(`Testing the sales' controller layer`, () => {

  describe('Listing all products', () => {
    describe('Checking response', () => {
      const response = {};
      const request = {};
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(salesServices, "getAll").resolves(mocks.allProductsResponse);
      });

      after(() => {
        salesServices.getAll.restore();
      });

      it('Rsponse with status 200', async () => {
        await salesControllers.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('Returns an array', async () => {
        await salesControllers.getAll(request, response);
        expect(response.json.calledWith(mocks.allProductsResponse)).to.be.equal(true);
      });
    });
  });

});
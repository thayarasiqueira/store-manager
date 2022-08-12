const sinon = require("sinon");
const { expect } = require("chai");
const mocks = require("../../../__tests__/_dataMock");
const productsControllers = require("../../../controllers/productsControllers");
const productsServices = require("../../../services/productsServices");


describe(`Testing the products' controller layer`, () => {

  describe('Listing all products', () => {
    describe('Checking response', () => {
      const response = {};
      const request = {};
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsServices, "getAll").resolves(mocks.allProductsResponse);
      });

      after(() => {
        productsServices.getAll.restore();
      });

      it('Rsponse with status 200', async () => {
        await productsControllers.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('Returns an array', async () => {
        await productsControllers.getAll(request, response);
        expect(response.json.calledWith(mocks.allProductsResponse)).to.be.equal(true);
      });
    });
  });

  // describe('Listing product by its id', () => {
  //   describe('Checking response', () => {
  //     const response = {};
  //     const request = {};
  //     const product = mocks.allProductsResponse[0];
  //     before(() => {
  //       request.params = '1';
  //       response.status = sinon.stub().returns(response);
  //       response.json = sinon.stub().returns();
  //       sinon.stub(productsServices, "findById").resolves(product);
  //     });

  //     after(() => {
  //       productsServices.findById.restore();
  //     });

  //     it("Retorna o status 200", async () => {
  //       await productsControllers.findById(request, response);
  //       expect(response.status.calledWith(200)).to.be.equal(true);
  //     });

  //     it("Retorna o produto correto", async () => {
  //       await productsControllers.findById(request, response);
  //       expect(response.json.args[0][0]).to.eql(product);
  //     });
  //   });
  // });

});

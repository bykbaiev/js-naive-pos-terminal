const PointOfSaleTerminal = require('./index');

const testCases = [
  { order: 'ABCDABA', expectedResult: 13.25 },
  { order: 'CCCCCCC', expectedResult: 6 },
  { order: 'ABCD', expectedResult: 7.25 }
];

describe('#PointOfSaleTerminal', () => {
  let pos = null;

  beforeEach(() => {
    pos = new PointOfSaleTerminal();

    pos.setPricing([
      { productCode: 'A', price: 1.25, count: 1 },
      { productCode: 'A', price: 3, count: 3 },
      { productCode: 'B', price: 4.25, count: 1 },
      { productCode: 'C', price: 1, count: 1 },
      { productCode: 'C', price: 5, count: 6 },
      { productCode: 'D', price: 0.75, count: 1 },
    ]);
  });

  testCases.map(
    ({ order, expectedResult }) => test(
      `should correctly calculate total price (${expectedResult}) of order ${order}`,
      () => {
        order.split('').forEach(
          productCode => pos.scan(productCode)
        );

        expect(pos.calculateTotal()).toEqual(expectedResult);
      }
    )
  );
});

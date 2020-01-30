const { Product, OrderedProduct } = require('./product');

class PointOfSaleTerminal {
  constructor() {
    this._products = [];
    this._order = [];
  }

  setPricing(products) {
    if (!this.isPricingConfigValid(products)) {
      console.error('INVALID PRODUCTS CONFIG');
      return;
    }

    this._products = products.reduce(
      (accum, { productCode, price, count }) => {
        const product = accum.find(
          accumProduct => accumProduct.productCode === productCode
        ) || new Product(productCode);

        product.setPrice(price, count);

        return accum
          .filter(product => product.productCode !== productCode)
          .concat([product]);
      },
      [],
    );
  }

  scan(productCode) {
    if (!this.hasProduct(productCode)) {
      console.error(`INVALID PRODUCT CODE ${productCode}`);
      return;
    }

    const orderedProduct = this.getOrderedProduct(productCode)
      || new OrderedProduct(productCode);
    orderedProduct.increaseCount();

    this._order = this._order
      .filter(orderedProduct => orderedProduct.productCode !== productCode)
      .concat([orderedProduct]);
  }

  calculateTotal() {
    return this._order.reduce(
      (total, orderedProduct) => {
        const product = this.getProduct(orderedProduct.productCode);
        return total + product.calculatePrice(orderedProduct.count);
      },
      0,
    );
  }

  getProduct(productCode) {
    return this._products.find(product => product.productCode === productCode);
  }

  hasProduct(poroductCode) {
    return !!this.getProduct(poroductCode);
  }

  getOrderedProduct(productCode) {
    return this._order.find(orderedProduct => orderedProduct.productCode === productCode);
  }

  isPricingConfigValid(products) {
    return products && Array.isArray(products) && products.every(
      product => product
        && Product.isProductCodeValid(product.productCode)
        && Product.isProductPriceValid(product.price)
        && Product.isProductCountValid(product.count)
    );
  }
}

module.exports = PointOfSaleTerminal;

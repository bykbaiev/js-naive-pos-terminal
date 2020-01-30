class Product {
  constructor(productCode) {
    this._productCode = productCode;
    this._singlePrice = 0;
    this._batched = {
      count: 0,
      price: 0,
    };
  }

  get productCode() {
    return this._productCode;
  }

  setBatched(price, count) {
    this._batched = {
      price,
      count,
    };
  }

  setPrice(price, count) {
    if (count === 1) {
      this._singlePrice = price;
      return;
    }

    this.setBatched(price, count);
  }

  calculatePrice(count) {
    let batchedAmount = 0,
      batchedTotalPrice = 0;

    if (this._batched.count) {
      batchedAmount = Math.floor(count / this._batched.count) * this._batched.count;
      batchedTotalPrice = this._batched.price / this._batched.count * batchedAmount;
    }

    return batchedTotalPrice + (count - batchedAmount) * this._singlePrice;
  }

  static isProductCodeValid(productCode) {
    return productCode && typeof productCode === 'string';
  }

  static isProductPriceValid(price) {
    return price && typeof price === 'number' && price > 0;
  }

  static isProductCountValid(count) {
    return count && typeof count === 'number' && count > 0 && count === parseInt(count, 10);
  }
}

class OrderedProduct {
  constructor(productCode) {
    this._productCode = productCode;
    this._count = 0;
  }

  get productCode() {
    return this._productCode;
  }

  get count() {
    return this._count;
  }

  increaseCount() {
    this._count = this._count + 1;
  }
}

module.exports = {
  Product,
  OrderedProduct,
};

const Product = require('./Product')
module.exports = class Poster extends Product {
  constructor(name, desciption, height, width, price, inStock = 0) {
    super(name, desciption, price, inStock)
    this.height = height
    this.width = width
  }
}
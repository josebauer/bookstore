const Database = require('./Database')
const Book = require('./entities/Book')
const Order = require('./entities/Order')
const Poster = require('./entities/Poster')
const User = require('./entities/User')
const Author = require('./entities/Author')

module.exports = class App {
  static #database = new Database()

  createUser(name, email, password) {
    const user = new User(name, email, password)
    App.#database.saveUser(user)
  }

  get users() {
    return App.#database.find('users')
  }

  createAuthor(name, nationality, bio) {
    const author = new Author(name, nationality, bio)
    App.#database.saveAuthor(author)
  }

  get authors() {
    return App.#database.find('authors')
  }

  createBook(title, synopsis, genre, pages, author, desciption, price, inStock) {
    const book = new Book(title, synopsis, genre, pages, author, desciption, price, inStock)
    App.#database.saveBook(book)
  }

  addBook(bookName, quantity) {
    App.#database.addBooksToStock(bookName, quantity)
  }

  get books() {
    return App.#database.find('books')
  }

  createPoster(name, desciption, height, width, price, inStock) {
    const poster = new Poster(name, desciption, height, width, price, inStock)
    App.#database.savePoster(poster)
  }

  addPoster(posterName, quantity) {
    App.#database.addPostersToStock(posterName, quantity)
  }

  get posters() {
    return App.#database.find('posters')
  }

  createOrder(items, user) {
    const order = new Order(items, user)
    App.#database.saveOrder(order)
    order.data.items.forEach(({ product, quantity }) => {
      if (product instanceof Book) {
        App.#database.removeBooksFromStock(product.name, quantity)
      } else if (product instanceof Poster) {
        App.#database.removePostersFromStock(product.name, quantity)
      }
    })
  }

  get orders() {
    return App.#database.find('orders')
  }

  showDatabase() {
    App.#database.showStorage()
  }
 
}
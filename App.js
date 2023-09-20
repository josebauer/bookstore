import Database from "./database.js";
import Author from "./entities/Author.js";
import Book from "./entities/Book.js";
import Order from "./entities/Order.js";
import Poster from "./entities/Poster.js";
import User from "./entities/User.js";

export default class App {
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

  createPoster(name, desciption, height, width, price, inStock) {
    const poster = new Poster(name, desciption, height, width, price, inStock)
    App.#database.savePoster(poster)
  }

  addPoster(posterName, quantity) {
    App.#database.addPostersToStock(posterName, quantity)
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
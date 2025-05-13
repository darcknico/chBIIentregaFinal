import {config} from './../config/index.js'
import * as mongodb from './mongodb/index.js'

let productDAO, userDAO, cartDAO, tokenDAO, ticketDAO

switch (config.DB_CONNECTION) {
  case 'mongodb':
    productDAO = new mongodb.ProductDAO()
    userDAO = new mongodb.UserDAO()
    cartDAO = new mongodb.CartDAO()
    tokenDAO = new mongodb.TokenDAO()
    ticketDAO = new mongodb.TicketDAO()
    break
  default:
    throw new Error('Tipo de base de datos no soportado')
}

export { productDAO, userDAO, cartDAO, tokenDAO, ticketDAO }
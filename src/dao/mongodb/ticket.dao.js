import MongoDAO from './mongo.dao.js'
import { TicketModel } from './models/ticket.model.js'

export default class TicketDAO extends MongoDAO {
  constructor() {
    super(TicketModel)
  }
}
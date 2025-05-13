import MongoDAO from './mongo.dao.js'
import { ProductModel } from './models/product.model.js'

export default class ProductDAO extends MongoDAO {
  constructor() {
    super(ProductModel)
  }
}
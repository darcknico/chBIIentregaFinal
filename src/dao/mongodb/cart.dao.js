import MongoDAO from './mongo.dao.js'
import { CartModel } from './models/cart.model.js'

export default class CartDAO extends MongoDAO {
    constructor() {
        super(CartModel)
    }

    async getById(cartId) {
        return await this.model.findById(cartId).populate('products.product')
    }

    async getByUserId(userId) {
        return await this.model.findOne({ userId })
    }
}
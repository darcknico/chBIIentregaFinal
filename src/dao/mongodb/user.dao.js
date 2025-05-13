import MongoDAO from './mongo.dao.js'
import { UserModel } from './models/user.model.js'

export default class UserDAO extends MongoDAO {
    constructor() {
        super(UserModel)
    }

    async deleteByEmail(email) {
        return await this.model.deleteOne({ email })
    }

    async getByEmail(email) {
        return await this.model.findOne({ email })
    }
}
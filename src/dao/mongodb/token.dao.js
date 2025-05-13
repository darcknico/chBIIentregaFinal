import MongoDAO from './mongo.dao.js'
import { TokenModel } from './models/token.model.js'

export default class TokenDAO extends MongoDAO {
  constructor() {
    super(TokenModel)
  }

  async getByUserId(user_id) {
    return await this.model.findOne({ user_id })
  }

  async getByToken(token) {
    return await this.model.findOne({ token })
  }

  async delete({ user_id, token }) {
    return await this.model.deleteOne({ user_id, token })
  }
}
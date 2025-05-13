const defaultConfig = {
  includePassword: false,
  includeId: false,
}

export default class UserDTO {
  constructor(user, config = defaultConfig) {
    this.first_name = user.first_name
    this.last_name = user.last_name
    this.email = user.email
    this.age = user.age
    this.cart = user.cart
    this.role = user.role
    if (config.includePassword) {
      this.password = user.password
    }
    if (config.includeId) {
      this._id = user._id
    }
  }
}
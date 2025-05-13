import mongoose, { Schema } from 'mongoose'

const cartSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      _id: false,
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    },
  ],
})

export const CartModel = mongoose.model('Cart', cartSchema)
import mongoose, { Schema } from 'mongoose'

export const productSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    stock: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    price: { 
        type: Number, 
        required: true, 
        min: 0 
    },
})

export const ProductModel = mongoose.model('Product', productSchema)
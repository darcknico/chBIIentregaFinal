import mongoose, { Schema } from "mongoose";
const userSchema = new mongoose.Schema({
    first_name: { 
        type: String, 
        required: true 
    },
    last_name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    age: { 
        type: Number, 
        required: true 
    },
    password: { 
        type: String, 
        minLength: 6 
    },
    cart: { 
        type: Schema.Types.ObjectId, 
        ref: 'Cart' 
    },
    role: { 
        type: String, 
        default: 'user' 
    },
})

export const UserModel = mongoose.model('users', userSchema);
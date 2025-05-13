import { cartDAO, productDAO, ticketDAO, userDAO } from './../dao/index.js'
import ValidationError from '../errors/validation.error.js'
import AuthorizationError from '../errors/authorization.error.js'
import NotFoundError from '../errors/not-found.error.js'
import ConflictError from '../errors/conflict.error.js'

export const getCart = async (cartId) => {
    const cart = await cartDAO.getById(cartId)
    if (!cart) {
        throw new NotFoundError(`El carrito ${cartId} no existe`)
    }
    return cart
}

export const createCart = async (user, params) => {
    const existingCart = await cartDAO.getByUserId(user._id)
    if (existingCart){
        throw new ConflictError('Ya existe un carrito para el usuario')
    }
    const createdCart = await cartDAO.create({
        ...params,
        userId: user._id,
    })
    return createdCart
}

export const createOrUpdateItemToCart = async (user, cartId, params) => {
    const cart = await cartDAO.getById(cartId)
    if (!cart) {
        throw new ValidationError('El carrito no existe')
    }
    if (cart.user_id.toString() !== user._id.toString()) {
        throw new AuthorizationError(
        'No tiene permisos sobre este carrito'
        )
    }
    const product = await productDAO.getById(params.product_id)
    if (!product) {
        throw new ValidationError(
        'El producto que intenta agregar al carrito no existe'
        )
    }
    if (product.stock == 0) {
        throw new ValidationError('El producto no tiene stock disponible')
    }
    const newProduct = { quantity: params.quantity, product }
    let products = [];
    const index = cart.products.findIndex((pr)=>pr.product._id.toString() == product._id.toString());
    if(index>=0){
        products[index] = newProduct;
    } else {
        products = [...cart.products, newProduct]
    }
    const updatedCart = await cartDAO.update(cart._id, {
        products,
    })
    return updatedCart
}

export const removeItemFromCart = async (user, cartId, itemId) => {
    const cart = await cartDAO.getById(cartId)
    if (!cart) {
        throw new ValidationError('El carrito no existe')
    }
    if (cart.user_id.toString() !== user._id.toString()) {
        throw new AuthorizationError(
        'No tienes permisos sobre este carrito'
        )
    }
    const filteredProducts = cart.products.filter((cartProduct) => {
        return cartProduct.product._id.toString() !== itemId
    })
    const updatedCart = await cartDAO.update(cart._id, {
        products: filteredProducts,
    })
    return updatedCart
}

export const closePurchase = async (user, cartId) => {
    const cart = await getCart(cartId)
    if (!cart) {
        throw new ValidationError('El carrito no existe')
    }
    if (cart.user_id.toString() !== user._id.toString()) {
        throw new AuthorizationError(
        'No tienes permisos sobre este carrito'
        )
    }
    const { products } = cart;
    if(products.length == 0){
        throw new ValidationError('El carrito esta vacio')
    }
    let totalAmount = 0;
    const productsCartToUpdated = [];
    for (const cartProduct of products) {
        const product = await productDAO.getById(cartProduct.product._id)
        let quantityToSold = cartProduct.quantity
        if (cartProduct.quantity > product.stock) {
            quantityToSold = cartProduct.quantity - product.stock;
            productsCartToUpdated.push({
                product,
                quantity: Math.abs(product.stock - cartProduct.quantity),
            });
        }
        totalAmount += cartProduct.product.price * quantityToSold
    }
    await cartDAO.update(cartId, {
        products: productsCartToUpdated,
    })
    const soldProducts = products.map((cartProduct) => cartProduct.product)
    const ticketData = {
        purchaser: `${user.first_name} ${user.last_name}`,
        products: soldProducts,
        amount: totalAmount,
    }
    for (const cartProduct of products) {
        const productUpdateStock = cartProduct.product;
        await productDAO.update(productUpdateStock._id,{
            stock: cartProduct.quantity > productUpdateStock.stock? 0 : productUpdateStock.stock - cartProduct.quantity,
        })
    }
    const ticket = await ticketDAO.create(ticketData)
    return ticket
}
import * as cartRepository from '../repositories/cart.repository.js'

export const getCart = async (req, res, next) => {
    try {
        const { id } = req.params
        const cart = await cartRepository.getCart(id)
        return res.status(200).json(cart)
    } catch (error) {
        next(error)
    }
}

export const createCart = async (req, res, next) => {
    try {
        const { body } = req
        const createdCart = await cartRepository.createCart(req.user, body)
        return res.status(201).json(createdCart)
    } catch (error) {
        next(error)
    }
}

export const closePurchase = async (req, res, next) => {
    try {
        const { id } = req.params
        const ticket = await cartRepository.closePurchase(req.user, id)
        return res.status(200).json(ticket)
    } catch (error) {
        next(error)
    }
}

export const createOrUpdateItem = async (req, res, next) => {
    try {
        const { id } = req.params
        const { body } = req
        const updatedCart = await cartRepository.createOrUpdateItemToCart(req.user, id, body)
        return res.status(200).json(updatedCart)
    } catch (error) {
        next(error)
    }
}

export const removeItem = async (req, res, next) => {
    try {
        const { id, item_id } = req.params
        const updatedCart = await cartRepository.removeItemFromCart(
            req.user,
            id,
            item_id
        )
        return res.status(200).json(updatedCart)
    } catch (error) {
        next(error)
    }
}
import * as productsRepository from './../repositories/products.repository.js'

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await productsRepository.getAllProducts()
        return res.status(200).json(products)
    } catch (error) {
        next(error)
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const id = req.params.id
        const product = await productsRepository.getProductById(id)
        return res.status(200).json(product)
    } catch (error) {
        next(error)
    }
}

export const createProduct = async (req, res, next) => {
    try {
        const { body } = req
        const newProduct = await productsRepository.createProduct(body)
        return res.status(201).json(newProduct)
    } catch (error) {
        next(error)
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id
        const { body } = req
        const updatedProduct = await productsRepository.updateProductById(id, body)
        return res.status(200).json(updatedProduct)
    } catch (error) {
        next(error)
    }
}

export const deleteProductById = async (req, res, next) => {
    try {
        const id = req.params.id
        await productsRepository.deleteProductById(id)
        return res.status(204).send()
    } catch (error) {
        next(error)
    }
}
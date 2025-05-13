import NotFoundError from '../errors/not-found.error.js'
import { productDAO } from './../dao/index.js'

export const getAllProducts = async () => {
    const data = await productDAO.getAll()
    return data
}

export const getProductById = async (id) => {
    const data = await productDAO.getById(id)
    if (!data) throw new NotFoundError()
    return data
}

export const createProduct = async (params) => {
    const data = await productDAO.create(params)
    return data
}

export const updateProductById = async (id, params) => {
    const data = await productDAO.update(id, params)
    if (!data) throw new NotFoundError()
    return data
}

export const deleteProductById = async (id) => {
   await productDAO.delete(id)
}
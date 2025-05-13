import { tokenDAO } from './../dao/index.js'
import crypto from 'crypto'

export const getTokenByUserId = async (userId) => {
    const token = await tokenDAO.getByUserId(userId)
    return token
}

export const getToken = async ({ userId, token: userToken }) => {
    const token = await tokenDAO.get({ user_id:userId, token: userToken })
    return token
}

export const createToken = async (userId) => {
    const token = crypto.randomBytes(32).toString('hex')
    const createdToken = await tokenDAO.create({ user_id:userId, token })
    return createdToken
}

export const deleteToken = async ({ userId, token }) => {
    await tokenDAO.delete({ user_id:userId, token })
}
import { ticketDAO } from './../dao/index.js'

export const createTicket = async (params) => {
    const data = await ticketDAO.create(params)
    return data
}
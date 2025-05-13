import { Router } from 'express'
import * as cartsController from './../controllers/carts.controller.js'
import { passportCall } from '../middlewares/passport-call.js'
import cardAddItemValidator from '../middlewares/validators/cart-add-item-validator.js'

export const cartsRouter = Router()

cartsRouter.use(passportCall())
cartsRouter.get('/:id', [], cartsController.getCart)
cartsRouter.post('/', [], cartsController.createCart)
cartsRouter.post('/:id/items', [cardAddItemValidator], cartsController.createOrUpdateItem)
cartsRouter.post('/:id/purchase', [], cartsController.closePurchase)
cartsRouter.delete('/:id/items/:item_id', [], cartsController.removeItem)
import { Router } from 'express'
import * as productController from '../controllers/products.controller.js'
import validateAdminAuthorization from '../middlewares/check-role.js'
import productValidator from '../middlewares/validators/product.validator.js'
import { passportCall } from '../middlewares/passport-call.js'

export const productRouter = Router()

productRouter.get('/',productController.getAllProducts)

productRouter.use(passportCall())
productRouter.get('/:id', [validateAdminAuthorization], productController.getProductById)
productRouter.post('/',[validateAdminAuthorization, productValidator],productController.createProduct)
productRouter.put('/:id',[validateAdminAuthorization],productController.updateProduct)
productRouter.delete('/:id',[validateAdminAuthorization],productController.deleteProductById)
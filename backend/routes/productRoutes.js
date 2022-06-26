import { deleteProduct, editProduct, getProducts, getProductById, postProduct } from "../controllers/productController.js";
import express from 'express'
const router = express.Router()
import bodyParser from "body-parser";
var jsonParser = bodyParser.json()
import verifyToken from '../middleware/auth.js'

router.route('/').get(getProducts)

router.route('/:id').get(getProductById)

router.route('/create').post(jsonParser,postProduct)

router.route('/edit').put(jsonParser,editProduct)

router.route('/delete').delete(jsonParser,deleteProduct)

export default router
import { deleteCategory, editCategory, getCategories, getCategoryById, postCategory } from "../controllers/categoryController.js";
import express from 'express'
const router = express.Router()
import bodyParser from "body-parser";
var jsonParser = bodyParser.json()
import verifyToken from '../middleware/auth.js'

router.route('/').get(getCategories)

router.route('/:id').get(getCategoryById)

router.route('/create').post(jsonParser,postCategory)

router.route('/edit').put(jsonParser,editCategory)

router.route('/delete').delete(jsonParser,deleteCategory)

export default router
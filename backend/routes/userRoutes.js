import { deleteUser, editUser, getUserById, getUsers, login, register } from "../controllers/userController.js";
import express from 'express'
const router = express.Router()
import bodyParser from "body-parser";
var jsonParser = bodyParser.json()
import verifyToken from '../middleware/auth.js'

router.route('/').get(getUsers)

router.route('/find').get(getUserById)

router.route('/login').post(jsonParser,login)

router.route('/register').post(jsonParser,register)

router.route('/edit').put(jsonParser,editUser)

// router.route('/editPass').put(jsonParser,editPassword)

router.route('/delete').delete(jsonParser,verifyToken,deleteUser)

export default router
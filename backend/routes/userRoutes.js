import { deleteUser, editUser, postUser } from "../controllers/userController.js";
import express from 'express'
const router = express.Router()
import bodyParser from "body-parser";
var jsonParser = bodyParser.json()

router.route('/create').post(jsonParser,postUser)

router.route('/edit').put(jsonParser,editUser)

// router.route('/editPass').put(jsonParser,editPassword)

router.route('/delete').delete(jsonParser,deleteUser)

export default router
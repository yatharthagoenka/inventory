import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const getUsers = asyncHandler(async(req, res) => {
    const user = await User.find({})
    res.json(user)
})

export const getUserById  = asyncHandler(async(req, res) => {
  var id = mongoose.Types.ObjectId(req.query.id)
  const user = await User.findById(id)

  if(user){
      res.json(user)
  }else{
      res.status(404).json({message: "user not found"})
      res.status(404)
      throw new Error('user not found')
  }
})

export const login = asyncHandler(async(req, res) => {
    try {
        const { email, password } = req.body;
    
        if (!(email && password)) {
          res.status(400).send("Incomplete input");
        }

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(
            { user_id: user._id, email },
            "secretKey",
            {
              expiresIn: "2h",
            }
          );
          user.token = token;
          await user.save()
          res.status(200).json(user);
        }
        else res.send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
})


export const register = asyncHandler(async(req,res)=>{

    const email = req.body.email;

    const oldUser = await User.findOne({email});
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    var encryptedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        password: encryptedPassword,
    })
    const token = jwt.sign(
        { user_id: user._id, email },
        "secretKey",
        {
          expiresIn: "2h",
        }
      );
    user.token = token;
    try {
        const newUser = await user.save()
        res.json(newUser)
    } catch (err){
        throw Error(err)
    }
})

export const editUser = asyncHandler(async(req,res)=>{
    let user
    var id = mongoose.Types.ObjectId(req.query.id)
    
    try {
        user = await User.findById(id)
        user.name = (req.body.name)?req.body.name:user.name
        user.mobile = (req.body.mobile)?req.body.mobile:user.mobile
        user.email = (req.body.email)?req.body.email:user.email
        if(req.body.password){
          user.password = (req.body.password!=user.password)?req.body.newPassword:user.password
        }
        user.token = user.token
        const newUser = await user.save()
        res.json(newUser)
    } catch(err){
        if(user==null){
            throw new Error('user not found')
        }else{
          console.log(user)
            throw Error(err)
        }
    }
})

export const deleteUser = asyncHandler(async(req,res)=>{
    let user
    var id = mongoose.Types.ObjectId(req.query.id)
    try {
        user = await User.findById(id)
        await user.remove()
        res.json({"Result":"Removed"})
    } catch {
        if(user==null){
            throw new Error('user not found')
        }else{
            throw new Error('user not deleted')
        }
    }
})

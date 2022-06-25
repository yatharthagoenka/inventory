import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'

export const getUsers = asyncHandler(async(req, res) => {
    const user = await user.find({})
    res.json(user)
})

export const postUser = asyncHandler(async(req,res)=>{
    console.log(req.body)
    const user = new User({
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        password: req.body.password,
    })
    try {
        const newUser = await user.save()
        res.json(newUser)
    } catch {
        throw new Error('user not created')
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
        user.password = (req.body.newPassword!=user.password)?req.body.newPassword:user.password
        await user.save()
        res.json(user)
    } catch {
        if(user==null){
            throw new Error('user not found')
        }else{
            throw new Error('user not updated')
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

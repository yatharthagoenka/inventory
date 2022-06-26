import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'

export const getProducts = asyncHandler(async(req, res) => {
    const product = await Product.find({})
    res.json(product)
})

export const getProductById  = asyncHandler(async(req, res) => {
    var id = mongoose.Types.ObjectId(req.query.id)
    const product = await Product.findById(id)

    if(product){
        res.json(product)
    }else{
        res.status(404).json({message: "product not found"})
        res.status(404)
        throw new Error('product not found')
    }
})

export const postProduct = asyncHandler(async(req,res)=>{
    console.log(req.body)
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        availability: req.body.availability,
        category: req.body.category
    })
    try {
        const newProduct = await product.save()
        res.json(newProduct)
    } catch {
        throw new Error('product not created')
    }
})

export const editProduct = asyncHandler(async(req,res)=>{
    let product
    var id = mongoose.Types.ObjectId(req.query.id)
    try {
        product = await Product.findById(id)
        product.name = (req.body.name)?req.body.name:product.name
        product.price = (req.body.price)?req.body.price:product.price
        product.availability = (req.body.availability)?req.body.availability:product.availability
        product.category = (req.body.category)?req.body.category:product.category
        await product.save()
        res.json(product)
    } catch {
        if(product==null){
            throw new Error('product not found')
        }else{
            throw new Error('product not updated')
        }
    }
})

export const deleteProduct = asyncHandler(async(req,res)=>{
    let product
    var id = mongoose.Types.ObjectId(req.query.id)
    try {
        product = await Product.findById(id)
        await product.remove()
        res.json({"Result":"Removed"})
    } catch {
        if(product==null){
            throw new Error('product not found')
        }else{
            throw new Error('product not deleted')
        }
    }
})

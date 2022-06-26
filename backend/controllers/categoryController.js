import Category from '../models/categoryModel.js'
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'

export const getCategories = asyncHandler(async(req, res) => {
    const category = await Category.find({})
    res.json(category)
})

export const getCategoryById  = asyncHandler(async(req, res) => {
    const category = await Category.findById(req.params.id)

    if(category){
        res.json(category)
    }else{
        res.status(404).json({message: "Category not found"})
        res.status(404)
        throw new Error('Category not found')
    }
})

export const postCategory = asyncHandler(async(req,res)=>{
    console.log(req.body.name)
    const category = new Category({
        name: req.body.name
    })
    try {
        const newCategory = await category.save()
        res.json(newCategory)
    } catch(err) {
        throw Error(err)
    }
})

export const editCategory = asyncHandler(async(req,res)=>{
    let category
    var id = mongoose.Types.ObjectId(req.query.id)
    try {
        category = await Category.findById(id)
        category.name = (req.body.name)?req.body.name:category.name
        await category.save()
        res.json(category)
    } catch {
        if(category==null){
            throw new Error('Category not found')
        }else{
            throw new Error('Category not updated')
        }
    }
})

export const deleteCategory = asyncHandler(async(req,res)=>{
    let category
    var id = mongoose.Types.ObjectId(req.query.id)
    try {
        category = await Category.findById(id)
        var query = {category: id}
        const test = await Product.deleteMany(query)
        console.log(test)
        await category.remove()
        res.json({"Result":"Removed"})
    } catch {
        if(category==null){
            throw new Error('Category not found')
        }else{
            throw new Error('Category not deleted')
        }
    }
})

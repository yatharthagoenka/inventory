import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    availability: {
        type: Number,
        required: true
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true 
    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export default Product
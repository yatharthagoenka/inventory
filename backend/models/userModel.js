import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    token:{
        type: String
    }
})

const User = mongoose.model('User', userSchema)

export default User
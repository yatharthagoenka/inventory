import connectDB from './backend/database/db.js';
import express from 'express'
import dotenv  from 'dotenv'
import userRoutes from './backend/routes/userRoutes.js';
import categoryRoutes from './backend/routes/categoryRoutes.js'
import productRoutes from './backend/routes/productRoutes.js'
import bodyParser from 'body-parser'
import cors from 'cors'


dotenv.config();

const app = express()


app.use(cors({
    origin: "http://localhost:3001"
}))

connectDB();

app.use(bodyParser.urlencoded({limit: '10mb',extended: true}))

app.use('/category', categoryRoutes)
app.use('/product', productRoutes)
app.use('/user', userRoutes)

app.listen(process.env.PORT || 3000,function (err) {
    if(err){
        console.log(err);
    }else {
        console.log("Server Started At Port 3000");
    }
});

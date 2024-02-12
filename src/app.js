// index.js or app.js

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js';
import morgan from 'morgan'
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'
import cartRoutes from './routes/cartRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'

dotenv.config()

const app = express();
const APP_PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL
//app.use(morgan('dev'))
try {
    
    mongoose.set('strictQuery', false);
  await mongoose.connect(MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
 
    app.listen(APP_PORT, () => {
        console.log(`Backend iniciado en puerto ${APP_PORT}, conectado a bbdd remota`)
    })
    app.use(cors({
    origin : 'http://localhost:5173',
   credentials: true
} ))  
    app.options('/api/products', cors());

    app.use(morgan("dev"))
    app.use(express.json())
    app.use(cookieParser())
    app.use('/api', userRoutes);
    app.use('/api/products', productRoutes)
    app.use('/api', cartRoutes)
    app.use('/api', paymentRoutes)
} catch(err) {
    console.log(`ERROR al inicializar backend: ${err.message}`)}

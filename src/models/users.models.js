// userModel.js
/// faltaria terminar de arreglarlo segun como el de productos
import mongoose from 'mongoose';
import autoPopulate from 'mongoose-autopopulate'
import products from './products.models.js'

//import { collection } from 'moongose/models/user_model';
mongoose.pluralize(null);
const collections = 'users'

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true 
  },
  password: {
    type: String,
    required: true,
  },
  cart: 
   [{
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    
      },
      quantity: {
        type: Number,
        default: 1,
      },
}]
  
});



export default mongoose.model(collections, schema);
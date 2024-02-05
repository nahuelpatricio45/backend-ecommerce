import mongoose from 'mongoose'
mongoose.pluralize(null);
const collection = 'CartItem'

const CartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });
 export default mongoose.model(collection, CartItemSchema);
// productModel.js

import mongoose from 'mongoose';

mongoose.pluralize(null);
const collection = 'products'

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  brand: String,
  category: String,
  thumbnail: String,
  images: {
    type: [String],
    default: [],
  },
});


export default mongoose.model(collection, schema);

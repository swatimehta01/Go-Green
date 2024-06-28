const mongoose = require('mongoose');
//mongoose.connect("mongoose://127.0.0.1:27017/nayaappforgolus");
// Define the product schema 
const productSchema = new mongoose.Schema({
  imageText: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  image:{
        type:String
  }
  
});

// Create the Post model
module.exports = mongoose.model('product', productSchema);



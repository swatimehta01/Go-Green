const mongoose = require('mongoose');
//mongoose.connect("mongoose://127.0.0.1:27017/nayaappforgolus");
// Define the post schema
const postSchema = new mongoose.Schema({
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
  },
  user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
  },
  likes: {
    type: Array,
    default: []
  }
});

// Create the Post model
module.exports = mongoose.model('Post', postSchema);



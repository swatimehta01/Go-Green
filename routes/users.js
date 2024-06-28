const mongoose = require('mongoose');
const plm=require('passport-local-mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/gogreen");

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  contact: {
    type: Number,
    required: true
  },
  password: {
    type: String
  },
  posts: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post'
  }],
  dp: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullname: {
    type: String,
  }
});

// Create the User model
userSchema.plugin(plm);
module.exports = mongoose.model('User', userSchema);





var express = require('express');
var router = express.Router();
const userModel=require("./users");
 const postModel=require("./post");
 const productModel=require("./product");
const passport = require('passport');
const localStrategy=require('passport-local');
const upload=require('./multer');
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('login',{error:req.flash('error')});
});

router.get('/profile', function(req, res, next) {
  res.render('profile');
});

router.get('/pay', function(req, res, next) {
  res.render('pay');
});
router.post('/upload',isLoggedIn,upload.single('file'), async function(req, res, next) {
  if(!req.file){
    return res.status(404).send('no files were given');
  }
  const user=await userModel.findOne({username:req.session.passport.user});
  const post=await postModel.create({
    image:req.file.filename,
    imageText:req.body.filecaption,
    user:user._id
  });
   
  user.posts.push(post._id);
  await user.save();
  res.redirect('/scrap');
});

router.get('/scrap',isLoggedIn, async function(req, res, next) {
  const user=await userModel.findOne({
   username:req.session.passport.user
  })
   .populate('posts');
 // console.log(user);
  res.render('scrap',{user});
});


// -----------------------


// router.post('/upload',upload.single('file'), async function(req, res, next) {
//   if(!req.file){
//     return res.status(404).send('no files were given');
//   }
//   const product=await postModel.create({
//     image:req.file.filename,
//     imageText:req.body.filecaption,
   
//   });
   
  
//   res.redirect('/product');
// });


// router.get('/product', async function(req, res, next) {
// //   const user=await userModel.findOne({
// //    username:req.session.passport.user
// //   })
// //    .populate('product');
// //  // console.log(user);
//   res.render('product');
// });


// router.get('/product', function(req, res, next) {
//   res.render('product');
// });



//---------------------------

router.get('/homepage', function(req, res, next) {
  res.render('homepage');
});

router.get('/scrap', function(req, res, next) {
  res.render('scrap');
});



router.get('/account',isLoggedIn, async function(req, res, next) {
  const user=await userModel.findOne({
   username:req.session.passport.user
  })
   //.populate('posts');
 // console.log(user);
  res.render('account',{user});
});
router.get('/account', function(req, res, next) {
  res.render('account');
});
router.get('/cart', function(req, res, next) {
  res.render('cart');
});


router.get('/chair', function(req, res, next) {
  res.render('chair');
});
router.get('/bench', function(req, res, next) {
  res.render('bench');
});
router.get('/cabinet', function(req, res, next) {
  res.render('cabinet');
});
router.get('/table', function(req, res, next) {
  res.render('table');
});
router.post('/register', function(req, res) {
  const userData=new userModel({
  username: req.body.username,
  email:req.body.email,
  contact:req.body.contact
 });
 
 userModel.register(userData,req.body.password)
 .then (function(){
  passport.authenticate('local')(req,res,function(){
    res.redirect('/profile');
  })
 })
});

router.post('/login',passport.authenticate('local',{
  successRedirect:'/profile',
  failureRedirect:'/login',
  failureFlash:true
}) ,function(req, res) {
  
});

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}

module.exports = router;


const User=require('../model/user_model');
var bcrypt = require('bcryptjs');
const express=require('express');
const router=express.Router();
// const router=require('router');

router.post("/register", function (req, res) {
    //req 
 
    const username1 = req.body.username;
    const email1 = req.body.email;
    const password1 = req.body.password;
    const userType1 = req.body.userType;
   
  ///validation
    if(!username1 || !email1 || !password1 || !userType1){
      return res.status(422).json({message:"empty data"})
    }

//password encrypt
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password1, salt, function(err, hash) {
          // Store hash in your password DB.
          const user = new User({
            username: username1,
            email: email1,
            password: hash,
            ///random password store in password database
            userType: userType1
          });
          user.save();
        //data save
        //response
        res.status(200).json({ message: "successful" });
      });
  });

  //login code
});  


router.post("/login",function(req,res){

  //data email and passsword
   const email1=req.body.email;
   const password1=req.body.password;


   ///validation
     if(!email1 || !password1 ){
    return res.status(422).json({message:"empty data"})
  }
   //email match validationn
   User.findOne({email:email1}).then(function(result){
    if(result ===null){
      //unauthorized
      return res.status(401).json({message:"email not matched"});
    }

    //decrypt password
    // Load hash from your password DB.
     bcrypt.compare(password1, result.password, function(err, response) {
    // res === true
      if(response===false){
        return res.status(401).json({message:"password not matched"});
      }

      res.status(200).json({message:"login successful"})

    });

   })
   
})


//read

router.get('/userall',function(req,res){
  User.find().then(function(data){
    res.status(200).json(data);
  })
  .catch(function(err){
    res.status(500).json({message:err.message});
  })
})

//single user
router.get('/usersingle/:id',function(req,res){
  const id=req.params.id;

  // const id=req.body.id;
  User.find({_id:id}).then(function(data){
    res.status(200).json(data);
  })
  .catch(function(err){
    res.status(500).json({message:err.message});
  })
})

//delete
router.delete('/userdelete/:id',function(req,res){
  const id=req.params.id;

  User.deleteOne({_id:id}).then(function(response){
    res.status(200).json({message:"delete successful"})
  })
  .catch(function(error){
    res.status(500).json({message:error.message})
  })
  
})

router.put('/updateOne/:id',function(req,res){
  const email1=req.body.email2;
  const password1=req.body.password2;
  const username1=req.body.username2;
  const userType1=req.body.userType2;
  const id=req.params.id;

  User.updateOne({_id:id},{email:email1,password:password1,username:username1,userType:userType1})
  .then(function(response){
      res.status(200).json({messsage:"update successful"})
  })
  .catch(function(error){
    res.status(500).json({message:error.message})
  })
})


module.exports=router;

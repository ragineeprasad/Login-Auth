var express = require('express');
var router = express.Router();
var User = require('../model/user');
var jwt = require('jsonwebtoken');

router.post('/register',(req,res,next)=>{
    var user = new User({
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,
        creation_date : Date.now()

    })

    user.save((err,docs) =>{
        if(!err){
            res.send(docs);
        }else{
            console.log('Unable to register : '+ JSON.stringify(err, undefined , 2))
        }
    })
})

router.post('/login',(req,res,next)=>{
    //username : req.body.username;
    password : req.body.password;

    //const user = User.find(user => user.email == req.body.email);
    console.log("Password"+ req.body.pwd +"Email ID"+ req.body.email)
    User.findOne({'email' : req.body.email}).exec((err,docs)=>{
        console.log(docs,err)
        if(docs){
            console.log("DB pass: "+docs.password+"Login Pass: "+req.body.pwd)
            console.log("Username:" + docs.username)
           if(docs.password == req.body.pwd){
                let token = jwt.sign({username:docs.username},'secret123', {expiresIn : '3h'});
                return res.status(200).json(token);
            }else {
                return res.status(501).json({message:' Invalid Credentials'});
        }}else {
            return res.status(501).json({message:'User email is not registered.'})
          }
    })
})

router.get('/username', verifyToken, function(req,res,next){
    return res.status(200).json(decodedToken.username);
  })
  
  var decodedToken='';
  function verifyToken(req,res,next){
    //let token = req.query.token;
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    jwt.verify(token,'secret123', function(err, tokendata){
      if(err){
          console.log(err)
          console.log(tokendata)
        return res.status(400).json({message:' Unauthorized request'});
      }
      if(tokendata){
        decodedToken = tokendata;
        next();
      }
    })
  }

  router.post('/userNameByEmail',(req,res)=>{
    User.findOne({'email' : req.body.email}).exec((err,docs)=>{
      console.log(docs,err)
      if(docs){
          console.log("DB pass: "+docs.password)
          console.log("Username:" + docs.username)
          res.status(200).json(docs)
        }else {
          return res.status(501).json({message:'User email is not registered.'})
        }
  })
  })

module.exports = router;
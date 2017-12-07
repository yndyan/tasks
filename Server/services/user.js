const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const consts = require('../models/consts');
const User = require('../models/userM');
const crypto = require('crypto');


router.post('/', (req, reqRes) => {
    const token = crypto.randomBytes(24).toString('hex');
   
    //TODO check same toklen exist already in db
    const newUser = new User({   
        role : 'default',
        emailtoken: token
    });
    if(req.body.hasOwnProperty('email')){
        newUser['email'] =  req.body['email'];
    }
    if(req.body.hasOwnProperty('username')){
        newUser['username'] =  req.body['username'];
    }
    if(req.body.hasOwnProperty('password')){
        newUser['password'] =  req.body['password'];
    }
    console.log(newUser);
    User.addUser(newUser)
        .then(()=> reqRes.status(201).json({msg:'User registered'}))
        .catch(err=> reqRes.status(409).json({msg: err.message}));
});


router.post('/auth', (req, reqRes) => {
    const  username = req.body.hasOwnProperty('username') ? req.body['username'] : '';
    const  password = req.body.hasOwnProperty('password') ? req.body['password'] : '';
    const a = User.getUserByUsername(username);
    const b = a.then( (user) => User.comparePassword(password,user.password));

    Promise.all([a, b])
        .then(([user,passwordAreEqual])=>{
            if(passwordAreEqual){
                const token = jwt.sign( {username : user.username, email : user.email},consts.jwtSecret, {expiresIn : 4000 } );
                reqRes.json({token: 'JWT '+token, username : user.username, role :  user.role});
            } else {
                throw({msg : 'username/password not correct' });
            }
        })
        .catch(err=> reqRes.status(500).json({msg: 'username/password not correct' }));
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, reqRes) => {
    User.getUserById(reqRes.req.user._id)
        .then(user=> reqRes.json({user: user}))
        .catch(err=> reqRes.status(500).json({msg: err.message }));
});

router.put('/update',passport.authenticate('jwt', {session:false}), (req, reqRes) => {
    const updateUser = {};
    if(req.body.hasOwnProperty('email')){
        updateUser['email'] =  req.body['email'];
    }
    User.updateUser(reqRes.req.user._id,updateUser)
        .then(()=> reqRes.json({msg: 'updated'}))
        .catch(err=> reqRes.status(409).json(409,{msg : err.message }));
});

router.put('/password',passport.authenticate('jwt', {session:false}), (req, reqRes) => {
    const updateUser = { password : req.body.hasOwnProperty('password') ? req.body['password'] : ''};
    User.updateUserPassword(reqRes.req.user._id,updateUser)
        .then(()=> reqRes.json({msg: 'password updated'}))
        .catch(err=> reqRes.status(409).json({msg: err.message }));
});

router.post('/verifyemail', (req, reqRes) => {
    const  verifycode = req.body.hasOwnProperty('verifycode') ? req.body['verifycode'] : '';
    User.verifyUserEmail(verifycode)
        .then((res)=>{
            if(res !== null ){
                reqRes.json({success: true, msg : 'email verified' });
            } else {
                reqRes.status(500).json({msg : 'invalid token' });
            }
        })
        .catch(err=> reqRes.status(500).json({msg: err.message }));
});


module.exports = Object.freeze(router);

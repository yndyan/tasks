const express = require('express');
const router = express.Router();
const passport = require('passport');
// const jwt = require('jsonwebtoken');
// const consts = require('../models/consts');
const User = require('../models/userM');
const crypto = require('crypto');

router.use(passport.authenticate('jwt', {session:false}),function(req, reqRes, next){
    if(reqRes.req.user.role === 'admin'){ 
        console.log('access enabled');
        next();
    } else {
        reqRes.status(403).json({msg: 'You are not a premium user' });
    }
});

router.post('/users', (req, reqRes) => {
    const token = crypto.randomBytes(24).toString('hex');
    
    //TODO check same toklen exist already in db
    console.log('body',req.body);
     
    const newUser = new User({   
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
    if(req.body.hasOwnProperty('role')){
        newUser['role'] =  req.body['role'];
    }
    User.addUser(newUser)
        .then(()=> reqRes.json({msg:'User added'}))
        .catch(err=> reqRes.status(409).json({msg: err.message}));
});

router.get('/users/', (req, reqRes) => {
    //todo ADD SEARCH AND LIMIT
    User.getAllUsers()
        .then(res=> reqRes.json({users :res}))
        .catch(err=> reqRes.status(500).json({msg :err}));

});

router.get('/users/:userId', (req, reqRes) => {
    //no need to check userId existance, it's defined by route
    User.getUserById(req.params.userId)
        .then(res=> reqRes.json({user :res}))
        .catch(err=> reqRes.status(500).json({msg :err}));
});

router.delete('/users/:userId', (req, reqRes) => {
    //no need to check userId existance, it's defined by route
    User.deleteUserById(req.params.userId)
        .then(()=> reqRes.json({msg: 'deleted'}))
        .catch(err=> reqRes.status(409).json({msg :err}));
});

router.put('/users/:userId', (req, reqRes) => {
    //no need to check userId existance, it's defined by route
    const updateData = {};
    if(req.body.hasOwnProperty('email')){
        updateData['email'] =  req.body['email'];
    }
    if(req.body.hasOwnProperty('username')){
        updateData['username'] =  req.body['username'];
    }
    if(req.body.hasOwnProperty('role')){
        updateData['role'] =  req.body['role'];
    }
    User.updateUser(req.params.userId,updateData)
        .then(()=> reqRes.json({msg: 'updated'}))
        .catch(err=> reqRes.status(409).json({msg: err.message}));
});

router.put('/users/:userId/updatepassword', (req, reqRes) => {
    const updateUser = { password : req.body.hasOwnProperty('password') ? req.body['password'] : ''};
    User.updateUserPassword(req.params.userId,updateUser)
        .then(()=> reqRes.json({msg: 'password updated'}))
        .catch(err=> reqRes.status(409).json({msg: err.message}));
});

module.exports = Object.freeze(router);


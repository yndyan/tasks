const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const Email = require('./email');

const UserSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim: true,
        lowercase: true,
    },
    email : {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    emailtoken : {
        type : String,
        unique : true,
    },
    emailVerified : {
        type: Boolean,
        default  : false
    },
    password: {
        type : String,
        required : true
    },
    role :  {
        type : String,
        required : true
    },
    passwordtoken :  {
        type : String,
    },
});



// UserSchema.pre('save', function(next){
//     console.log('execute before save!');
//     next();
// });


const User =  module.exports = mongoose.model('User', UserSchema);


module.exports.getUserByUsername = function(username){
    return User.findOne({username: username}).exec();
};


module.exports.getUserById = function(user_id){
    const result = {email : 1 , emailVerified : 1, role : 1, username :1, _id :1};
    // const result'password':0,'__v' : 0 };
    return User.findOne({'_id': user_id},result).exec();
};




module.exports.addUser = function(newUser){
    return new Promise(function(resolve, reject){
        if(newUser.password === ''){//TODO add more password check
            reject({message :'password is required'});
        } else {
            bcrypt.genSalt(10, function(err, salt){
                if(err) reject (err);
                bcrypt.hash(newUser.password, salt, function(err, hash){
                    if(err) reject (err);
                    newUser.password   = hash;
                    newUser.save(function(err,res){
                        if(err){
                            reject(err);
                        } else {
                            Email.sendEmail('yndyan@gmail.com', res.emailtoken);
                            resolve(res);
                        }
                    });
                });
            });
        }
    });
};

module.exports.getAllUsers = function(){

    const result = {'_id':1,'username' : 1, 'email' : 1, emailVerified : 1, role : 1 };
    return User.find({},result).exec();
};

module.exports.comparePassword = function(plainPass, hashword) {
    return new Promise((resolve, reject)=>{
        bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {
            if(err!==null){
                console.log('Pass not match');
                reject(err);
            } else {
                resolve(isPasswordMatch);
            }
        });
    });
};

module.exports.updateUser= function (userId,updateData){

    return User.findOneAndUpdate({ '_id' : userId}, updateData,{ runValidators: true }).exec();
};

module.exports.updateUserPassword= function (userId,updateUser){
    return new Promise(function(resolve, reject){
        if(updateUser.password ===''){
            reject ({message:'Password required'});  
        }
        bcrypt.genSalt(10, function(err, salt){
            if(err) reject (err);
            bcrypt.hash(updateUser.password, salt, function(err, hash){
                if(err) reject (err);
                User.findOneAndUpdate({ '_id' : userId}, {password : hash},{ runValidators: true }).exec()
                    .then((res)=>{
                        resolve(res);
                    })
                    .catch((err)=>{
                        reject(err);
                    });
            });
        });
    });
};

module.exports.verifyUserEmail= function (emailtoken){
    return new Promise(function(resolve, reject){
        User.findOneAndUpdate({emailtoken : emailtoken}, {emailVerified : true, emailtoken : ' '  },{ runValidators: true }).exec()
            .then((res)=>{
                console.log(res);
                resolve(res);
            })
            .catch((err)=>{
                console.log(err);
                reject(err);

            });
    });
};

module.exports.deleteUserById = function(user_id){
    
    let query = { '_id' : user_id };
    return new Promise((resolve, reject)=>{
        User.findOneAndRemove(query).exec()
            .then((res)=>{
    
                //TODO remove projects and tasks ???
                resolve(res);
            })
            .catch((err)=>{
                reject(err);
            });
    });
    
};
    

module.exports.verifyUserEmail= function (emailtoken){
    return  User.findOneAndUpdate({emailtoken : emailtoken}, {emailVerified : true, emailtoken : ' '  },{ runValidators: true }).exec();
};

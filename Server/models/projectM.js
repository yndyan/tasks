const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Task = require('./taskM');

const ProjectsSchema = new Schema({

    userId   : {
        type: Schema.Types.ObjectId,
        required : true
    },
    name : {
        type : String,
        required : true,
        trim: true,

    },
    type : {
        type : String,
        required : true,

    },
    description: {
        type : String,
        required : true
    },

});

const Project =  module.exports = mongoose.model('Projects', ProjectsSchema);

module.exports.addNewProject  = function(newProject){//TODO add data verification
    //console.log(newProject);
    return newProject.save();
};

module.exports.getAllUserProjects = function (params){
    //  TODO add usage of sort and limit
    return Project.aggregate([
        {
            $match : params.query
        },
        {
            $lookup: {
                from: 'tasks', // collection name in db
                localField: '_id',
                foreignField: 'projectId',
                as: 'task'
            }
        }
    ]).exec();
};

module.exports.getProjectById = function (userId,projectId){

    const query = { 'userId' : userId, '_id' : projectId};
    const resultStructure = {_id: 0 , userId: 0 , '__v': 0};
    return Project.findOne(query,resultStructure).exec();
};

module.exports.deleteProjectById = function (userId,projectId){

    const query = { 'userId' : userId, '_id' : projectId};
    return  Project.findOneAndRemove(query).exec()
        .then((res)=>{
            console.log(res);
            return Task.deleteTasksByProjectId(projectId);
        });
};

module.exports.getAllProjects = function(){///TODO add username to Projects
    return new Promise((resolve, reject)=>{
        Project.find({},{_id : 1,name : 1})
            .exec()
            .then((res)=>{
                resolve(res);
            })
            .catch((err)=>{
                reject(err);
            });
    });
};

module.exports.updateProject= function (projectId,updateData){
    //return Project.findOneAndUpdate({ "_id" : ProjectId}, updateData, {safe: true} ).exec();
    return Project.findOneAndUpdate({ '_id' : projectId}, updateData,{ runValidators: true }).exec();

};

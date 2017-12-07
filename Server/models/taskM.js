const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  TasksSchema = new Schema({

    projectId   : {
        type: Schema.Types.ObjectId,
        required : true
    },
    taskName : {
        type : String,
        required : true,
        trim: true

    },
    done : {
        type : Boolean,
        default: false

    }
});

const Task =  module.exports = mongoose.model('Tasks', TasksSchema);

module.exports.addNewTask  = function(newTask){//TODO add data verification
    //console.log(newTask);
    return newTask.save();
};

module.exports.getAllTasks = function (projectId){
    const query = {'projectId' : projectId};
    const resultStructure = {'projectId' : 0,'__v': 0, };
    return Task.find(query,resultStructure).exec();//return promise
};

module.exports.getTaskById = function (projectId,TaskId){
    const query = { 'projectId' : projectId, '_id' : TaskId};
    const resultStructure ={ 'projectId' : 0, '_id' : 0, '__v' :0};
    return Task.findOne(query,resultStructure).exec();//return promise
};

module.exports.deleteTaskById = function (projectId,TaskId){
    const query = { 'projectId' : projectId, '_id' : TaskId};
    return Task.findOneAndRemove(query).exec();

};

module.exports.deleteTasksByProjectId = function (projectId){
    return Task.remove({ 'projectId' : projectId}).exec();
};

module.exports.addMessageToTask= function (projectId,TaskId,message){
    const query = { 'projectId' : projectId, '_id' : TaskId};
    if(mongoose.Types.ObjectId.isValid(projectId) && mongoose.Types.ObjectId.isValid(TaskId)){
        Task.findOneAndUpdate(query, {$push: {'messages': message}}, {safe: true,  new : true} ).exec()
            .then((res)=>{
                //console.log(res);
            })
            .catch((err)=>{
                //console.log(err);
            });
    }
    else {
        console.log('not valid object id');
    }
};

module.exports.updateTask= function (projectId,TaskId,updateData){
    const query = { '_id' : TaskId, 'projectId': projectId};
    return Task.findOneAndUpdate(query, updateData,{ runValidators: true }).exec();
};

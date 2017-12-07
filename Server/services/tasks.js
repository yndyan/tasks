const express = require('express');
const router = express.Router({mergeParams: true});
const Task = require('../models/taskM')
const passport = require('passport');

router.use(passport.authenticate('jwt', {session:false}));

router.post('/', (req, reqRes) => {
    // no need to check existance of projectID because it defined by route!
    const newTask = new Task({
        projectId : req.params.projectId
    });
    if(req.body.hasOwnProperty('taskName')){
        newTask['taskName'] =  req.body['taskName'];
    }
    if(req.body.hasOwnProperty('done')){
        newTask['done'] =  req.body['done'];
    }
    Task.addNewTask(newTask)
        .then(()=> reqRes.json({msg: 'task added'}))
        .catch(err=> reqRes.status(500).json({msg: err.message}));

});

router.get('/', (req, reqRes) => {
    //TODO add limit, seaRch and similar
    // no need to check existance of projectID because it defined by route!
    Task.getAllTasks(req.params.projectId)
        .then(res=> reqRes.json({tasks: res}))
        .catch(err=> reqRes.status(500).json({msg: err.message}));
});

router.get('/:taskId',(req, reqRes) => {
    // no need to check existance of project and task id because it defined by route!
    Task.getTaskById(req.params.projectId,req.params.taskId)
        .then(res=> reqRes.json({taskData: res}))
        .catch(err=> reqRes.status(500).json({msg: err.message}));

});

router.delete('/:taskId', (req, reqRes) => {
    // no need to check existance of project and task id because it defined by route!
    Task.deleteTaskById(req.params.projectId,req.params.taskId)
        .then(()=> reqRes.json({msg: 'deleted'}))
        .catch(err=> reqRes.status(500).json({msg :err.message}));
});

router.put('/:taskId', (req, reqRes) => {
    // no need to check existance of project and task id because it defined by route!
    const updateData = {};
    if(req.body.hasOwnProperty('taskName')){
        updateData['taskName'] =  req.body['taskName'];
    }
    if(req.body.hasOwnProperty('done')){
        updateData['done'] =  req.body['done'];
    }
    Task.updateTask(req.params.projectId,req.params.taskId, updateData)
        .then(()=> reqRes.json({msg: 'updated'}))
        .catch((err)=> reqRes.status(409).json({msg: err.message}));
});

module.exports = Object.freeze(router);

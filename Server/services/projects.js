const express = require('express');
const router = express.Router();
const Project = require('../models/projectM');
const passport = require('passport');

router.use(passport.authenticate('jwt', {session:false}));

router.post('/',(req, reqRes) => {
    const newProject = new Project({
        userId : reqRes.req.user._id,
    });
    if(req.body.hasOwnProperty('name')){
        newProject['name'] =  req.body['name'];
    }
    if(req.body.hasOwnProperty('type')){
        newProject['type'] =  req.body['type'];
    }
    if(req.body.hasOwnProperty('description')){
        newProject['description'] =  req.body['description'];
    }
    Project.addNewProject(newProject)
        .then(()=>reqRes.json({msg: 'added'}))
        .catch(err=> reqRes.status(409).json({'msg' : err.message}));
});



router.get('/',(req, reqRes) => {
    const params = { query : { userId : reqRes.req.user._id } };
    
    if(req.query.hasOwnProperty('name')){
        params.query['name'] =  req.query['name'];
    }
    if(req.query.hasOwnProperty('type')){
        params.query['type'] =  req.querys['type'];
    }
    params.limit = (req.query.hasOwnProperty('limit') && Number(req.query['limit']) < 5)  ? Number(req.query['limit']) : 5;
    params.sort = req.query.hasOwnProperty('sort') ? req.query['sort'] : { logDate: 'descending' }; 
    
    Project.getAllUserProjects(params)
        .then((res)=> reqRes.json({projects: res}) )
        .catch((err)=>reqRes.status(500).json({msg: err.message}));
});


router.get('/:projectId',(req, reqRes) => {
    //NO NEED TO CHECK IF PROJECT ID EXIST, IT DEFINED BY ROUTE
    const  userId = reqRes.req.user._id ;
    Project.getProjectById(userId,req.params.projectId)
        .then(res=> reqRes.json({projectData :res}))
        .catch(err=> reqRes.status(500).json({msg: err.message}));
});

router.delete('/:projectId',(req, reqRes) => {
    //NO NEED TO CHECK IF PROJECT ID EXIST, IT DEFINED BY ROUTE
    const userId = reqRes.req.user._id;
    Project.deleteProjectById(userId,req.params.projectId)
        .then(()=> reqRes.json({msg: 'deleted'}))
        .catch(err=> reqRes.status(409).json({msg: err.message}));
});

router.put('/:projectId' , (req, reqRes) => {
    //NO NEED TO CHECK IF PROJECT ID EXIST, IT DEFINED BY ROUTE
    const updateData = {};
    if(req.body.hasOwnProperty('name')){
        updateData['name'] =  req.body['name'];
    }
    if(req.body.hasOwnProperty('type')){
        updateData['type'] =  req.body['type'];
    }
    if(req.body.hasOwnProperty('description')){
        updateData['description'] =  req.body['description'];
    }
    Project.updateProject(req.params.projectId,updateData)
        .then(()=> reqRes.json({msg: 'updated'}))
        .catch(err=> reqRes.status(409).json({msg: err.message}));
});

module.exports = Object.freeze(router);

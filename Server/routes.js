const user = require('./services/user');
const projects = require('./services/projects');
const tasks = require('./services/tasks');
const admin = require('./services/admin');
const path = require('path');

module.exports = function(app) {
    //routes
    app.use('/api/admin', admin);
    app.use('/api/user', user);
    app.use('/api/projects', projects);
    app.use('/api/projects/:projectId/tasks',tasks);

    app.get('/', (req, res) => {
        res.send('Invalid Endpoint');
    });

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/index.html'));
    });
};
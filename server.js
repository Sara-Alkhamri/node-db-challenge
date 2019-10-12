const express = require('express');
const helmet = require('helmet');

const Projects = require('./data/projects/projects-model')

const server = express();
server.use(helmet());
server.use(express.json());

function boolconvert (arr) {
    const newArr = arr.map((obj) => {
        // return {...obj, completed: !!obj.completed}
        return {...obj, completed: obj.completed ? true : false}
    }) 
    return newArr;
}

//Crud - projects
server.get('/projects', (req, res) => {
    Projects.getProjects()
        .then(projects => {
            res.status(200).json(boolconvert(projects))
        })
        .catch(error => {
            res.status(500).json({ message: 'There was an error retrieving the projects.' })
        });
});

server.get('/projects/:id', (req, res) => {
    const {id} = req.params;
    Projects.getProjectById(id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json({message: 'There was an error retrieving the projects'})
    })
})

//post
server.post('/projects', (req, res) => {
    const newProject = req.body;
    Projects.addProject(newProject)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(error => {
        res.status(500).json({message: 'Project creation failed'})
    })
})

//Crud - resources
server.get('/projects/:id/resources', (req, res) => {
    const { id } = req.params;
    Projects.getResourcesByProject(id)
        .then(resources => {
            res.status(200).json(resources)
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to retrieve resources for this project' });
        });
});

server.get('/resources', (req, res) => {
    console.log('hello')
    Projects.getResources()
    .then(resources => {
        console.log(resources)
        res.status(200).json(resources)
    })
    .catch(error => {
        res.status(500).json({ message: 'Failed to retrieve resources' });
    });
})
//post
server.post('/resources', (req, res) => {
    const newResource = req.body;
    Projects.addResource(newResource)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(error => {
        res.status(500).json({message: 'Failed to add new Resource'})
    })
})

//crud - tasks
server.get('/projects/:id/tasks', (req, res) => {
    const { id } = req.params;
    Projects.getTasks(id)
        .then(tasks => {
            if (tasks.length) {
                res.status(200).json(tasks)
            } else {
                res.status(404).json({ message: 'Could not find tasks for given project.' })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'There was an error retrieving the tasks for this project.' });
        });
});


//post
server.post('/projects/:id', (req, res) => {
    const newTask = req.body;
    const { id } = req.params;
    
    Projects.getProjectById(id)
    .then(project => {
        if (project) {
            Projects.addTask(newTask, id)
            .then(task => {
              res.status(201).json(task);
            })
          } else {
            res.status(404).json({ message: 'Could not find project with given id.' })
          }
    })
    .catch (error => {
        res.status(500).json({ message: 'Failed to create new task.' });
    });
});
module.exports = server;
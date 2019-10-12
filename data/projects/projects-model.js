const db = require('../db-config');

module.exports = {
    getProjects,
    getProjectById,
    addProject,
    getResources,
    getResourcesByProject,
    addResource,
    getTasks,
    addTask
}

function getProjects() {
    return db('projects')
    .then(projects => {
        return projects;
    });
}

function getProjectById(id) {
    return db('projects')
    .where({ id })
    .first();
}


function addProject(project) {
    return db('projects')
    .insert(project, 'id')
    .then((project) => {
        return project;
    });
};
function getResources() {
    return db('resources')
}
function getResourcesByProject(project) {
    return db('project_resources AS pr')
        .where({'pr.resource_id': project})
        .select(
            'pr.resource_id',
            'pr.project_id',
            'projects.name AS project_name',
            'resources.name AS resource_name',
            'resources.description AS resource_description'
        )
        .join('projects', 'pr.project_id', 'projects.id')
        .join('resources', 'pr.resource_id', 'resources.id')
        .then(resources => {
            return resources
        });
};

function addResource(resource) {
    return db('resources')
    .insert(resource)
};

//tasks
function getTasks(project) {
    return db('tasks')
        .where({'tasks.project_id': project})
        .select(
            'projects.name',
            'projects.description AS project_description',
            // 'tasks.id',
            'tasks.description AS task_description',
            'tasks.notes',
            'tasks.completed',
            'tasks.project_id'
        )
        .join('projects', 'projects.id', 'tasks.project_id');
} 

function addTask(task, project_id) {
    return db('tasks')
    .insert(task, {'project_id': project_id})
    .then((task) => {
        return task;
    });

}
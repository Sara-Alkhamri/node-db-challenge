
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {id: 1, description: 'Plan the design', notes: 'check design notes', completed: false, project_id: 1},
        {id: 2, description: 'Sign up for course', notes: 'complete before Monday', completed: 0, project_id: 1},
        {id: 3, description: 'Check MVP', notes: 'complete routes', completed: false, project_id: 2},
        {id: 4, description: 'Fill out Form', notes: 'complete', completed: false, project_id: 2},
        {id: 5, description: 'Rebuild from scratch', notes: 'use React', completed: false, project_id: 3},
        {id: 6, description: 'Add photo', notes: 'complete before Monday', completed: false, project_id: 3},
      ]);
    });
};

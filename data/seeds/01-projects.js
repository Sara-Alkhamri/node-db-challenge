
exports.seed = function(knex) {
  // Deletes ALL existing entries
  
      // Inserts seed entries
      return knex('projects').insert([
        {id: 1, name: 'first', description: 'check notes', completed: false},
        {id: 2, name: 'second', description: 'due Monday', completed: false},
        {id: 3, name: 'third', description: '', completed: false}
      ]);
};


exports.seed = function(knex) {

      // Inserts seed entries
      return knex('resources').insert([
        {id: 1, name: 'Laptop', description: 'The good one'},
        {id: 2, name: 'Note pad', description: 'The White one'},
        {id: 3, name: 'Glasses', description: 'The ones you are wearing'},
        {id: 4, name: 'coffee', description: 'made at home'},
        {id: 5, name: 'Music', description: 'Becasue why not'}
      ]);
   
};

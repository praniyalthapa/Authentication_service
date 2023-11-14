'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {  //using seeders files helps us to add some roles 
    
      await queryInterface.bulkInsert('Roles', [{
        name: 'ADMIN',
        createdAt: new Date(),
        updatedAt:new Date()
      
      },{
        name: 'CUSTOMER',
        createdAt: new Date(),
        updatedAt:new Date()
      
      },
      {
        name: 'AIRLINE_BUSINESS',
        createdAt: new Date(),
        updatedAt:new Date()
      
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

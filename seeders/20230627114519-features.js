'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('feature_attributes',[{
      name: 'color',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'size',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'brand',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'material',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('feature_attributes', null, {});
  }
};

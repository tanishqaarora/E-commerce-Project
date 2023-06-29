'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('feature_attributes',[{
      name: 'size',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'fabric',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'brand',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'processor',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'RAM|SSD storage',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'screen size|display',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'operating system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'weight',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('feature_attributes', null, {});
  }
};

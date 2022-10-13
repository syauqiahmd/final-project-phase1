'use strict';

const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     let usercourses = JSON.parse(fs.readFileSync('./data/usercourse.json', 'utf-8'))
     usercourses = usercourses.map(el => {
       el.createdAt = new Date()
       el.updatedAt = new Date()
       return el
     })
     return queryInterface.bulkInsert('UserCourses', usercourses, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('UserCourses', null, {})
  }
};

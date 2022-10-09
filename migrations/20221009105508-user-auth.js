'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.addColumn('user_auths', 'class', {type: Sequelize.STRING} , {allowNull:false });
    //  await queryInterface.addConstraint('user-auth', {
    //   fields: ['column_name'],
    //   type: 'foreign key',
    //   name: 'custom_fkey_constraint_name', // optional
    //   references: {
    //     table: 'target_table_name',
    //     field: 'target_column_name'
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade'
    // });
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

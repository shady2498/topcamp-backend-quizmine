module.exports = (sequelize, Sequelize) => {
    const addMcqs = sequelize.define("mcqs", {
      statement: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      options: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      correct_option: {
        type: Sequelize.STRING,
        allowNull: false,
      },

    });
  
    return addMcqs;
  };
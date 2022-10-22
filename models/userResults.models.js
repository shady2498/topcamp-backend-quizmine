module.exports = (sequelize, Sequelize) => {
    const UserResult = sequelize.define("user_results", {
      result: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      skill_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      total_score:{
        type: Sequelize.STRING,
        allowNull: false,
      }
  
    });
  
    return UserResult;
  };
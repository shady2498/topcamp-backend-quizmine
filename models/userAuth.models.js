module.exports = (sequelize, Sequelize) => {
    const UserAuth = sequelize.define("user_auth", {
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
     
      }
    });
  
    return UserAuth;
  };
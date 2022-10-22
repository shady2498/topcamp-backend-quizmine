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
      class: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        // allowNull:false,
      }
    });
  
    return UserAuth;
  };
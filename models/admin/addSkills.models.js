module.exports = (sequelize, Sequelize) => {
    const addSkills = sequelize.define("skills", {
      class: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      subject: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      chapter: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  
    return addSkills;
  };
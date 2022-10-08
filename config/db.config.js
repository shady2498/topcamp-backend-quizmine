module.exports = {
    HOST: "topcamp-backend-ecommerce.cfc58crjqwck.us-east-1.rds.amazonaws.com",
    USER: "admin",
    PASSWORD: "theadminpassword#",
    DB: "QUIZ_APP",
    dialect: "mysql",
    port: 3306,
    pool: {
      max: 100,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
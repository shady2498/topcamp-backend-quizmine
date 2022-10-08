const express = require("express");
const cors = require("cors");
const app = express();
// const mysql = require("mysql");



// //cors
var corsOptions = {
    origin: "http://localhost:4002"
  };

  app.use(cors(corsOptions));

  app.use(express.json());

  const db = require("./models");

  // db.sequelize.sync({ force: true }).then(() => {
  //   console.log("Drop and re-sync db.");
  // });
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


app.get("/", (req, res) => {
  res.json({ message: "Welcome to quiz site application." });
});

require("./routes/user_auth.routes")(app);

// set port, listen for requests
const PORT = 4002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


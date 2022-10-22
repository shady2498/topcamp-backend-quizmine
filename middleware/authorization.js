const jwt = require("jsonwebtoken");;

const SECRET = require("../data/global.data");


module.exports = function(req, res, next) {
  //get the token from the header if present
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  //if no token found, return response (without going to the next middelware)
    console.log("middle ware")
  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    console.log("this is req", req.user);
    if(req.user.role !== "admin"){
        return res.send("Invalid Permissions")
    }
    next();
  } catch (ex) {
    //if invalid token
    return res.status(400).send("Invalid token.");
  }
};
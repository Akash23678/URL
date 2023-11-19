const express = require("express");
const URLrouter = express.Router();


const {generateNewUrl} = require("../controllers/handler");

URLrouter.route("/")
.post(generateNewUrl)


module.exports = URLrouter;
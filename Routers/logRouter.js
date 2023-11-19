const express = require("express");
const router = express.Router();
const {handleLogIngest, handleGetLogs} = require("../controllers/logHandler");

router.route("/")
.post(handleLogIngest)
.get(handleGetLogs);




module.exports = router;
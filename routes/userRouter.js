const express = require("express");
const router = express.Router();
const { handleCreateUser, handleGetUser, logoutUser } = require("../controllers/userHandler");
const {handleGetSignupPage, handleGetSigninPage} = require("../controllers/userHandler");

router.route("/signup")
.post(handleCreateUser)
.get(handleGetSignupPage)

router.route("/signin")
.post(handleGetUser)
.get(handleGetSigninPage)

router.route("/logout")
.get(logoutUser)

module.exports = router;
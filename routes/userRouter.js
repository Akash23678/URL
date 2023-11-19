const express = require("express");
const router = express.Router();
const { handleCreateUser, handleGetUser, logoutUser } = require("../controllers/userHandler");


router.route("/signup")
.post(handleCreateUser);

router.route("/signin")
.post(handleGetUser);

router.route("/logout")
.get(logoutUser)

module.exports = router;
const express = require("express");
const analyticsRouter= express.Router();


const {getAnalytics} = require("../controllers/handler");

analyticsRouter.route("/:shortId")
.get(getAnalytics)


module.exports = analyticsRouter;
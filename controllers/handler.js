const model = require("../models/urlModel");
const shortid = require("shortid");

// for URL Router
const generateNewUrl = async (req, res)=>{
    const body = req.body;
    console.log(body);
    if(!body.url){
        return res.status(400).json({error: "URL Required"});
    }

    //create document
    const shortID = shortid();
    await model.create({
        shortId : shortID,
        redirectURL:body.url,
        totalVisitHistory:[] 
    })
    return res.render("home", {id : shortID});
   
}


//for AnalyticsRouter
const getAnalytics = async (req, res)=>{
    const ID = req.params.shortId;
    const result = await model.findOne({shortId : ID});
    console.log(result);
    res.json({
        totalClicks: result.totalVisitHistory.length,
        analytics: result.totalVisitHistory,
        OriginalURL: result.redirectURL
    })
}
module.exports = {
    generateNewUrl,
    getAnalytics
};
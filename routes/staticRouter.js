const express = require("express");
const router = express.Router();

const { getSession } = require("../sessions-cookies/session");

router.route("/").get((req, res) => {
    // const UID = req.cookies.UID;
    // if(!UID){
    //     return res.render("home");
    // }
    
    // const sessionData = getSession(UID);
    // console.log(UID, sessionData);

    // if (sessionData) {
    //   return res.render("home", {
    //     isAuthenticated: true,
    //     userName: sessionData.userName,
    //   });
    // }else{
    //   return res.render("home");
    // }


    //session verify
    if(req.session){
        if(req.session.user){
            const user = req.session.user;
            console.log("session presnt");
            return res.render("home", {loggedinHomePage:true, uName: user.uName})
        }
    }
    return res.render("home", {homePage:"HomePage!!!"});

});

module.exports = router;

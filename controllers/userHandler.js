const userModel = require("../models/userModel");

const { v4: uuidv4 } = require('uuid');
const { setSession, getSession } = require("../sessions-cookies/session");

//For SignUP User
const handleCreateUser = async (req, res)=>{
    console.log(req.body);
    const {name, email, password} = req.body;

    let user = await userModel.findOne({email});
    if(user){
        return res.json({signup_status : false, msg : "Email already registered"})
    }
    user = await userModel.create({
        name, email, password
    })

    return res.render("home",{"showSignedinPopup":true});
}

//For Signin User 
const handleGetUser = async (req, res)=>{
    console.log(req.body);

    if(!req.body){
        return res.status(400).json({isAuthenticated : false, msg:"Pls Enter Input Detail"})
    }
// Get User from DB
    const {email, password} = req.body;
    const getUser = await userModel.findOne({email, password});
    if(!getUser){
        return res.status(404).send({
            isAuthenticated : false,
            msg:"Invalid UserName or Password" 
        });
    }
    
    // const sessionID = uuidv4();
    // console.log("sessionID", sessionID);

    // setSession(sessionID, getUser);   //here we store sessionID --> getUser._id & getUserName  why we will store pass, email
    // res.cookie("UID", sessionID);

    //set session
    req.session.user = {id: getUser._id, uName: getUser.name};

    console.log("session", req.session.user);
    return res.redirect("/");
}



// Get Signup Page
const handleGetSignupPage = (req, res)=>{
    try{
        console.log("Successfully render signup page");
        return res.render("signup")
    }catch(err){
        console.log("Unable to render Signup Page")
        return res.render("error", {error: "Internal Server Error", status:500})
    }
} 

//Get Signin Page
const handleGetSigninPage = (req, res)=>{
    try{
        console.log("Successfully render signin page");
        return res.render("signin");
    }catch(err){
        console.log("Unable to render Signin Page")
        return res.render("error", {error: "Internal Server Error", status:500})
    }
} 



//Logout
const logoutUser = (req, res)=>{
    req.session.user =  null;
    console.log("session deleted logout");
    return res.redirect("/");
}



module.exports = {
    handleCreateUser,
    handleGetUser,
    handleGetSignupPage,
    handleGetSigninPage,
    logoutUser
}
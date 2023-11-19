const express = require("express");
const connectMongoDB = require("./connection");
const model = require("./models/urlModel");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const ejs = require("ejs");


const analyticsRouter = require("./routes/analyticsRouter")
const URLrouter = require("./routes/urlRouter");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/userRouter")


const app = express();
const PORT = 8002;
connectMongoDB("mongodb://localhost:27017/short-urlDB");

//Middleware -> process the req 
app.use(express.json());  
app.use(express.urlencoded({extended:false}))   // to encode the form data
app.use(cookieParser());
app.use(session({
    secret: "my_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie:{ secure: false, maxAge: 10 * 60 * 1000}   // 10 min
}))
// EJS
app.set("view engine", "ejs");
app.use(express.static("./public"))


//Routes & Router
app.use("/", staticRouter);
app.use("/user", userRouter);
app.use("/url", URLrouter);
app.use("/analytics", analyticsRouter);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    // const document = await model.findOneAndUpdate(
    //     {
    //         shortId
    //     }, 
    //     {
    //     $push: {
    //         totalVisitHistory: {
    //             timestamp : new Date()
    //         } 
    //         }
    //     }
    // );
    const document = await model.findOne({ shortId });
    console.log(document);
    if(!document){
        return res.status(404).json({error: "Short URL not found : Create New Short URL"})
    }
    document.totalVisitHistory.push({ timestamp: Date.now() });

    // Save the updated document
    await document.save();

    res.redirect(document.redirectURL);
})



app.get("*", (req, res)=>{
    return res.status(404).render("error", {error: "the page you are looking for not avaible!", status:404})
})
app.listen(PORT, ()=> console.log(`Server Started At ${PORT} Port`));
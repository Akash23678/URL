const express = require("express");
const app = express();
const PORT = 3000;

const logRouter = require("./Routers/logRouter")

const connectMongoDB = require("./connectionDB");
connectMongoDB("mongodb://localhost:27017/Log-IngestorDB");


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/logs", logRouter);

app.use("*", (req, res) => {
    return res.status(404).json({Error : "Page you are looking for does not exist, pls check url"})
})







app.listen(PORT, ()=> console.log(`Server Running at ${PORT}`));


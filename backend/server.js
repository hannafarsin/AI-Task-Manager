const express =require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Task = require("./models/Task");
const taskRoutes = require("./routes/taskRoutes");
const app=express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/tasks", taskRoutes);
  

app.get("/", (req, res) => {
    res.send("Home Page");
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
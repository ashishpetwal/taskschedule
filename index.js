import express from "express";
import Task from './Routes/Task.js';
import User from "./Routes/User.js";
import { mongoose } from "mongoose";
import cron from './Utils/cron.js';
import { sendMsg, remindUser } from "./Utils/twilio.js";
import fetchuser from "./Middleware/fetchuser.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT;

cron();
remindUser();

try {
    mongoose.connect(process.env.MONGO_URI);
  console.log("connected to database")
} catch (error) {
    console.log(error);
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/tasks",fetchuser, Task);
app.use("/api/user", User);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
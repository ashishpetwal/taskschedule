import express from "express";
import User from "../Models/User.js";
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/signup", async (req, res)=>{
    const {phone, priority} = req.body;
    const user = await User.findOne({phone});
    if(user){
        return res.status(400).json({error: "User already exists"});
    }
    try {
        const user = new User({
          phone,
          priority,
        });

        await user.save();
        const token = jwt.sign({user: user},process.env.JWT_SECRET);
        res.json({user,token});
    } catch (error) {
        res.json({message: error});
    }
})

router.post("/login", async (req, res)=>{
    const {phone} = req.body;
    try {
        const user = await User.findOne({phone});
        if(!user){
            return res.status(400).json({error: "Invalid phone number"});
        }
        const token = jwt.sign({user: user},process.env.JWT_SECRET);
        res.json({user, token});
    } catch (error) {
        console.log(error);
    }
})

export default router;
import twilio from 'twilio';
import cron from 'node-cron';
import Task from '../Models/Task.js';
import User from '../Models/User.js';
import dotenv from "dotenv";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const remindUser = () => {
  cron.schedule(`0 0 * * *`, async () => {
    const newDate = new Date();
    const tasks = await Task.find({deletedAt: null});
    for(let i=0; i<tasks.length; i++){
      const currentTask = tasks[i];
      const dt = currentTask.due;
      if(newDate>dt){
        await Task.updateOne({_id: currentTask._id}, {deletedAt: new Date()});
        const phone = await User.findOne({_id: currentTask.user},{phone: 1, _id: 0});
        sendMsg(phone.phone);
      }
      else{
        console.log("Time not yet")
      }
    }
  })
}

export const sendMsg = (phone) => {
      try {
        client.calls.create({
          url: "http://demo.twilio.com/docs/voice.xml",
          to: `+${phone}`,
          from: process.env.TWILIO_PHONE_NUMBER,
        })
        console.log("Call sent successfully")
      } catch (error) {
        console.log(error);
      }
}
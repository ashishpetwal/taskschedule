import cron from 'node-cron';
import Task from '../Models/Task.js'


export default function startCron() {
  cron.schedule("0 0 * * *", async () => {
    try {
      const tasks = await Task.find({ deletedAt: null });
      for (let i = 0; i < tasks.length; i++) {
        const currentTask = tasks[i];
        await Task.updateOne(
          { _id: currentTask._id },
          { $inc: { priority: -1 } }
        );
        console.log("updated priority");
      }
    } catch (error) {
      console.error("An error occurred: ", error);
    }
  });
}

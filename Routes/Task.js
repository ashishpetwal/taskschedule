import express from "express";
import Task from "../Models/Task.js";
import Subtask from "../Models/Subtask.js";

const router = express.Router();

router.post("/add", async (req, res) => {
    const { title, description, due, priority } = req.body;
    const user = req.user;
    const task = new Task({
        user,
        title,
        description,
        due,
        priority
    });
    try {
        const savedTask = await task.save();
        res.json(savedTask);
    } catch (error) {
        res.json({ message: error });
    }
});

router.post("/addsub", async (req, res) => {
    const { taskId, title, description, due } = req.body;
    const task = new Subtask({
        taskId,
        title,
        description,
        due,
    });
    try {
        const savedTask = await task.save();
        res.json(savedTask);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get("/gettask", async (req, res) => {
    try {
        const tasks = await Task.find({ deletedAt: null});
        res.json(tasks);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get("/getsub/:taskId", async (req, res) => {
    const { taskId } = req.params;
    try {
        const tasks = await Subtask.find({ taskId, deletedAt: null});
        if (tasks.length === 0) {
            return res.json({ message: "No subtask found" });
        }
        res.json(tasks);
    } catch (error) {
        res.json({ message: error });
    }
});

router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, due } = req.body;
    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: id },
            {
                title,
                description,
                due,
            }
        );
        res.json(updatedTask);
    } catch (error) {
        res.json({ message: error });
    }
});

router.put("/updatesub/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedTask = await Subtask.findOneAndUpdate(
            { _id: id },
            {
                status,
                updatedAt: new Date(),
            },
            { new: true }
        );
        res.json(updatedTask);
    } catch (error) {
        res.json({ message: error });
    }
});

router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findOneAndUpdate(
            { _id: id },
            {
                deletedAt: new Date(),
            },
            { new: true }
        );
        res.json(deletedTask);
    } catch (error) {
        res.json({ message: error });
    }
});

router.delete("/deletesub/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Subtask.findOneAndUpdate(
            { _id: id },
            {
                deletedAt: new Date(),
            },
            { new: true }
        );
        res.json(deletedTask);
    } catch (error) {
        res.json({ message: error });
    }
});


export default router;

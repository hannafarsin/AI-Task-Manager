const Task = require("../models/Task");

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const createTask = async (req, res) => {
    try {
        const task = await Task.create({
            title: req.body.title,
            status: req.body.status
        });

        res.status(201).json({
            message: "Task created successfully",
            task: task
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                status: req.body.status
            },
            {
                returnDocument: "after"
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task updated successfully",
            task
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};
import Task from "../models/task.model.js";


export const getTasks = async (req, res) => {
    try{
        const tasks = await Task.find({
        user:req.user.id}).populate('user')
    res.json(tasks);
    }catch(error){
        return res.status(500).json({message: error.message})
    }
};

export const createTask = async (req, res) => {
    try{
    const {title, description, date} = req.body

        const newTask = new Task({
            title,
            description,
            date: date && date.trim() ? new Date(date + 'T00:00:00') : undefined,
            user: req.user.id

        });
        const savedTask = await newTask.save()
        res.json(savedTask);
    }catch(error){
        return res.status(500).json({message: error.message})
    }
};

export const getTask = async (req, res) => {
    try{
        const task = await Task.findById(req.params.id).populate('user');
    if (!task) return res.status(404).json({message: "Task not found"})
    res.json(task);
    }catch(error){
        return res.status(404).json({message: "Task not found"})
    }
};

export const deleteTask = async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found"});
    return res.sendStatus(204);
    }catch(error){
        return res.status(404).json({message: "Task not found"})
    }
};


export const updateTask = async (req, res) => {
    try{
        const {date, ...otherData} = req.body;
        
        const updateData = {
            ...otherData,
            ...(date && date.trim() && { date: new Date(date + 'T00:00:00') })
        };
        
        const task = await Task.findByIdAndUpdate(req.params.id, updateData, {new: true})
    if (!task) return res.status(404).json({message: "Task not found"})
    res.json(task);
    }catch(error){
        return res.status(404).json({message: "Task not found"})
    }
};

import { mongoose} from "mongoose";

const TaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    due: {
        type: Date,
        required: true,
    },
    priority: {
        type: Number,
        default: 0,
        required: true,
    },
    deletedAt: {
        type: Date,
        required: false,
    },
})

const Task = mongoose.model('Task', TaskSchema);
export default Task;
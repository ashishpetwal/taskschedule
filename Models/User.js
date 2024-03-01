import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    phone: {
        type: Number,
        required: true,
    },
    priority: {
        type: Number,
        required: true,
    }
})

export default mongoose.model('User', UserSchema);
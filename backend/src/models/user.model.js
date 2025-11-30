import mongoose from "mongoose";

const UserProfile = new mongoose.Schema({
    supabase_id: {
        type: String, 
        required: true, 
        unique: true
    },
    username: {
        type: String, 
        required: true
    },
    bio: {
        type: String
    },
    avatar: {
        type: String
    },

}, { timestamps: true });

export default mongoose.model("users", UserProfile);

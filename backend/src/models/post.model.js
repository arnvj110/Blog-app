import mongoose from "mongoose";

const Post = new mongoose.Schema({
    title: {
        type: String, required: true
    },
    content: {
        type: String, required: true
    },
    coverImg: {
        type: String
    },
    author_id: {
        type: String, required: true
    },
    

}, { timestamps: true });

export default mongoose.model("post", Post);

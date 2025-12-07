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
    author: {
        type: String
    }

}, { timestamps: true });

export default mongoose.model("post", Post);

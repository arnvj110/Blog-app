import Post from "../models/post.model.js"
import { marked } from "marked";
import UserProfile from "../models/user.model.js";

export const createPost = async (req, res) => {
  try {
    const { title, content, coverImg } = req.body;
    

    const author_id = await UserProfile.findOne({ supabase_id: req.user.id });
    

    const post = await Post.create({
      title,
      content,
      coverImg,
      author_id : author_id._id,
    });

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPosts = async (req, res) => {
  const posts = await Post.find().sort({ created_at: -1 });
  res.json(posts);
};

export const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
};

export const updatePost = async (req, res) => {
  const fields = req.body;

  const post = await Post.findOneAndUpdate(
    { _id: req.params.id, author_id: req.user.id },
    fields,
    { new: true }
  );

  res.json(post);
};

export const deletePost = async (req, res) => {
  await Post.findOneAndDelete({
    _id: req.params.id,
    author_id: req.user.id,
  });

  res.json({ success: true });
};

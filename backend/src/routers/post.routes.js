import express from "express";
import { auth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { createPostSchema, updatePostSchema } from "../schema/post.schema.js";
import {
  createPost,
  getPosts,
  getPost,
  
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);

// router.get("/search/:query", searchPosts);

router.post("/", auth, validate(createPostSchema), createPost);
router.put("/:id", auth, validate(updatePostSchema), updatePost);
router.delete("/:id", auth, deletePost);

export default router;

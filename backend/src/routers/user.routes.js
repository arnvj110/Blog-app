import express from "express";
import { auth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { createUserProfileSchema } from "../schema/user.schema.js";
import {
//   createUserProfile,
  getUserProfile,
    getUserProfileById,
} from "../controllers/user.controller.js";

const router = express.Router();

// router.post("/", auth, validate(createUserProfileSchema), createUserProfile);
router.get("/", auth, getUserProfile);
router.get("/:id", getUserProfileById);


export default router;

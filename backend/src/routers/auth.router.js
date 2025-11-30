import express from "express";
import { signup } from "../controllers/auth.controller.js";
import { login } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.js";
import { signupSchema } from "../schema/auth.schema.js";
import { loginSchema } from "../schema/auth.schema.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);

router.post("/login", validate(loginSchema), login);

export default router;

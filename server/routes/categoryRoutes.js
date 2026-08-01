// server/routes/categoryRoutes.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getCategories } from "../controllers/categoryController.js";

const router = express.Router();
router.use(authMiddleware);
router.get("/", getCategories);

export default router;
// routes/transactionRoutes.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createTransaction, getTransactions } from "../controllers/transactionController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createTransaction);
router.get("/", getTransactions);

export default router;
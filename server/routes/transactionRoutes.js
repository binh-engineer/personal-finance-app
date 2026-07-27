// routes/transactionRoutes.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createTransaction, getTransactions, updateTransaction } from "../controllers/transactionController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createTransaction);
router.get("/", getTransactions);
router.put("/:id", updateTransaction);

export default router;
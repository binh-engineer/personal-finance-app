// controllers/transactionController.js
import prisma from "../prisma/client.js";

export const createTransaction = async (req, res) => {
  try {
    const { amount, type, description, categoryId } = req.body;

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ error: "Amount must be a positive number" });
    }
    if (type !== "income" && type !== "expense") {
      return res.status(400).json({ error: "Type must be 'income' or 'expense'" });
    }
    if (!categoryId) {
      return res.status(400).json({ error: "categoryId is required" });
    }

    const category = await prisma.category.findUnique({
      where: { id: Number(categoryId) },
    });
    if (!category) {
      return res.status(400).json({ error: "Category does not exist" });
    }

    const transaction = await prisma.transaction.create({
      data: {
        amount: Number(amount),
        type,
        description,
        categoryId: Number(categoryId),
        userId: req.user.userId,
      },
    });

    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: req.user.userId },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
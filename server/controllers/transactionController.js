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

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, type, description, categoryId } = req.body;

    const existing = await prisma.transaction.findUnique({
      where: { id: Number(id) },
    });
    if (!existing) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    if (existing.userId !== req.user.userId) {
      return res.status(403).json({ error: "Not authorized to edit this transaction" });
    }

    if (amount !== undefined && (isNaN(amount) || Number(amount) <= 0)) {
      return res.status(400).json({ error: "Amount must be a positive number" });
    }
    if (type !== undefined && type !== "income" && type !== "expense") {
      return res.status(400).json({ error: "Type must be 'income' or 'expense'" });
    }

    const updated = await prisma.transaction.update({
      where: { id: Number(id) },
      data: {
        ...(amount !== undefined && { amount: Number(amount) }),
        ...(type !== undefined && { type }),
        ...(description !== undefined && { description }),
        ...(categoryId !== undefined && { categoryId: Number(categoryId) }),
      },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.transaction.findUnique({
      where: { id: Number(id) },
    });
    if (!existing) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    if (existing.userId !== req.user.userId) {
      return res.status(403).json({ error: "Not authorized to delete this transaction" });
    }

    await prisma.transaction.delete({ where: { id: Number(id) } });

    res.json({ message: "Transaction deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
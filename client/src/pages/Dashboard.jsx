// client/src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TransactionList from "../components/TransactionList";
import api from "../api/axios";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTransactions = async () => {
    const res = await api.get("/transactions");
    setTransactions(res.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [txRes, catRes] = await Promise.all([
          api.get("/transactions"),
          api.get("/categories"),
        ]);
        setTransactions(txRes.data);
        setCategories(catRes.data);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      fetchTransactions();
    } catch (err) {
      setError("Failed to delete transaction");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h2>
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <TransactionList transactions={transactions} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default Dashboard;
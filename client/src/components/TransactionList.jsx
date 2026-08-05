// client/src/components/TransactionList.jsx
function TransactionList({ transactions, onDelete }) {
  if (transactions.length === 0) {
    return <p className="text-gray-500 text-sm">No transactions yet.</p>;
  }

  return (
    <ul className="divide-y divide-gray-200 bg-white rounded-lg shadow-sm">
      {transactions.map((t) => (
        <li key={t.id} className="flex items-center justify-between px-4 py-3">
          <div>
            <span className={t.type === "income" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
              {t.type === "income" ? "+" : "-"}${t.amount}
            </span>
            <span className="text-gray-500 text-sm ml-2">{t.category?.name}</span>
            {t.description && <p className="text-gray-400 text-xs">{t.description}</p>}
          </div>
          <button onClick={() => onDelete(t.id)} className="text-sm text-red-600 hover:underline">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TransactionList;
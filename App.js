import React, { useState, useEffect } from "react";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  // טעינה מה-localStorage
  useEffect(() => {
    const data = localStorage.getItem("transactions");
    if (data) {
      setTransactions(JSON.parse(data));
    }
  }, []);

  // שמירה ל-localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = () => {
    if (!text || !amount) return;

    const newTransaction = {
      id: Date.now(),
      text,
      amount: +amount,
    };

    setTransactions([newTransaction, ...transactions]);
    setText("");
    setAmount("");
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const total = transactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: "auto" }}>
      <h2>💰 Budget App</h2>

      <h3>Balance: ₪{total}</h3>

      <input
        type="text"
        placeholder="תיאור"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <input
        type="number"
        placeholder="סכום"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      <button onClick={addTransaction}>הוסף</button>

      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.text} - ₪{t.amount}
            <button onClick={() => deleteTransaction(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
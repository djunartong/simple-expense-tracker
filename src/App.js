import "./styles.css";
import { useState } from "react";

export default function App() {
  const [expenses, setExpenses] = useState([]);

  function handleAddExpense(expense) {
    setExpenses((expenses) => [...expenses, expense]);
  }

  function handleDeleteExpense(name) {
    setExpenses((expenses) =>
      expenses.filter((expense) => expense.name !== name)
    );
  }

  return (
    <div className="App">
      <h1>💰 DAILY EXPENSE TRACKER 💰</h1>
      <Form onAddExpense={handleAddExpense} />
      <ExpenseTable expenses={expenses} onDeleteExpense={handleDeleteExpense} />
      {expenses.length > 0 && <Total expenses={expenses} />}
    </div>
  );
}

function Form({ onAddExpense }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("🍕 Food");
  const [method, setMethod] = useState("💵 Cash");
  const [amount, setAmount] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !amount) return;

    const newExpense = {
      name,
      category,
      method,
      amount,
    };

    onAddExpense(newExpense);

    setName("");
    setCategory("🍕 Food");
    setMethod("💵 Cash");
    setAmount(0);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-item">
        <label>Expense</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-item">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="🍕 Food">🍕 Food</option>
          <option value="🏠 Housing">🏠 Housing</option>
          <option value="🚗 Transport">🚗 Transport</option>
          <option value="🎥 Entertainment">🎥 Entertainment</option>
          <option value="🏥 Health">🏥 Health</option>
          <option value="🎈 Others">🎈 Others</option>
        </select>
      </div>

      <div className="form-item">
        <label>Payment Method</label>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="💵 Cash">💵 Cash</option>
          <option value="💳 Card">💳 Card</option>
        </select>
      </div>

      <div className="form-item">
        <label>Amount</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button className="button">Submit</button>
    </form>
  );
}

function ExpenseTable({ expenses, onDeleteExpense }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Expense</th>
          <th>Category</th>
          <th>Payment Method</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <Expense expense={expense} onDeleteExpense={onDeleteExpense} />
        ))}
      </tbody>
    </table>
  );
}

function Expense({ expense, onDeleteExpense }) {
  return (
    <tr>
      <td>{expense.name}</td>
      <td>{expense.category}</td>
      <td>{expense.method}</td>
      <td>${expense.amount}</td>
      <td>
        <button onClick={() => onDeleteExpense(expense.name)}>❌</button>
      </td>
    </tr>
  );
}

function Total({ expenses }) {
  function sum(expenses) {
    return expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  }

  return (
    <div>
      <h2>You have spent ${sum(expenses)} today</h2>
    </div>
  );
}

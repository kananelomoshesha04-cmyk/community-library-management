import { useEffect, useState } from "react";

export default function TransactionForm({ books, onRecord }) {
  const [bookId, setBookId] = useState(books[0]?.id ?? "");
  const [type, setType] = useState("add");
  const [quantity, setQuantity] = useState("1");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!books.some((book) => book.id === bookId)) {
      setBookId(books[0]?.id ?? "");
    }
  }, [bookId, books]);

  function handleSubmit(event) {
    event.preventDefault();

    const numericQuantity = Number(quantity);

    if (!bookId) {
      setMessage({ type: "error", text: "Add a book before recording stock." });
      return;
    }

    if (!Number.isInteger(numericQuantity) || numericQuantity < 1) {
      setMessage({
        type: "error",
        text: "Quantity must be a whole number of at least 1.",
      });
      return;
    }

    const result = onRecord(bookId, type, numericQuantity);
    setMessage({
      type: result.success ? "success" : "error",
      text: result.message,
    });

    if (result.success) {
      setQuantity("1");
    }
  }

  return (
    <form className="panel form-panel" onSubmit={handleSubmit}>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Stock control</p>
          <h2>Record Transaction</h2>
        </div>
      </div>

      {message && (
        <p className={`form-message ${message.type}`}>{message.text}</p>
      )}

      <label className="form-group">
        <span>Select Book</span>
        <select
          value={bookId}
          onChange={(event) => setBookId(event.target.value)}
          disabled={books.length === 0}
        >
          {books.length === 0 ? (
            <option value="">No books available</option>
          ) : (
            books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title} ({book.quantity} available)
              </option>
            ))
          )}
        </select>
      </label>

      <label className="form-group">
        <span>Transaction Type</span>
        <select value={type} onChange={(event) => setType(event.target.value)}>
          <option value="add">Add Stock</option>
          <option value="deduct">Borrow Book</option>
        </select>
      </label>

      <label className="form-group">
        <span>Quantity</span>
        <input
          type="number"
          min="1"
          step="1"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        />
      </label>

      <button className="primary-button full-width" type="submit">
        Record Transaction
      </button>
    </form>
  );
}

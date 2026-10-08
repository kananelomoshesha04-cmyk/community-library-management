import { useState } from "react";

function TransactionsPage({
  books,
  transactions,
  onRecordTransaction,
}) {
  const [bookId, setBookId] = useState("");
  const [transactionType, setTransactionType] =
    useState("add");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const result = onRecordTransaction(
      bookId,
      transactionType,
      quantity
    );

    setMessage(result.message);
    setMessageType(result.success ? "success" : "error");

    if (result.success) {
      setQuantity("");
    }
  }

  return (
    <div>
      <h1>Transactions</h1>

      <p>
        Add stock when books arrive or deduct stock when
        books are borrowed.
      </p>

      <div className="two-column-layout">
        <section className="card">
          <h2>Record Transaction</h2>

          {message && (
            <p
              className={
                messageType === "success"
                  ? "success-message"
                  : "error-message"
              }
            >
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="transaction-book">
                Select Book
              </label>

              <select
                id="transaction-book"
                value={bookId}
                onChange={(event) =>
                  setBookId(event.target.value)
                }
              >
                <option value="">Select a book</option>

                {books.map(function (book) {
                  return (
                    <option key={book.id} value={book.id}>
                      {book.title} ({book.quantity} available)
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="transaction-type">
                Transaction Type
              </label>

              <select
                id="transaction-type"
                value={transactionType}
                onChange={(event) =>
                  setTransactionType(event.target.value)
                }
              >
                <option value="add">Add Stock</option>
                <option value="deduct">
                  Borrow Book
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="transaction-quantity">
                Quantity
              </label>

              <input
                id="transaction-quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(event) =>
                  setQuantity(event.target.value)
                }
              />
            </div>

            <button type="submit" className="primary-button">
              Record Transaction
            </button>
          </form>
        </section>

        <section className="card">
          <h2>Transaction History</h2>

          {transactions.length === 0 ? (
            <p>No transactions have been recorded.</p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Date and Time</th>
                    <th>Book</th>
                    <th>Transaction</th>
                    <th>Quantity</th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.map(function (transaction) {
                    return (
                      <tr key={transaction.id}>
                        <td>{transaction.date}</td>
                        <td>{transaction.bookTitle}</td>
                        <td>{transaction.type}</td>
                        <td>{transaction.quantity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default TransactionsPage;
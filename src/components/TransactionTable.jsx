export default function TransactionTable({ transactions }) {
  return (
    <section className="panel table-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Audit trail</p>
          <h2>Transaction History</h2>
        </div>
      </div>

      {transactions.length === 0 ? (
        <p className="empty-state">No transactions have been recorded.</p>
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
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{new Date(transaction.date).toLocaleString()}</td>
                  <td>{transaction.bookTitle}</td>
                  <td>
                    <span
                      className={
                        transaction.type === "add"
                          ? "status-label available"
                          : "status-label low"
                      }
                    >
                      {transaction.type === "add"
                        ? "Stock Added"
                        : "Book Borrowed"}
                    </span>
                  </td>
                  <td>{transaction.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

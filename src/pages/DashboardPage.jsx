import StatCard from "../components/StatCard";

export default function DashboardPage({ books }) {
  const totalCopies = books.reduce((total, book) => total + book.quantity, 0);
  const availableTitles = books.filter((book) => book.quantity > 0).length;
  const lowStockBooks = books.filter((book) => book.quantity < 2).length;

  function getStatus(book) {
    if (book.quantity === 0) {
      return { text: "Out of Stock", className: "out" };
    }

    if (book.quantity < 2) {
      return { text: "Low Stock", className: "low" };
    }

    return { text: "Available", className: "available" };
  }

  return (
    <div>
      <section className="page-intro">
        <div>
          <p className="eyebrow">Library overview</p>
          <h2>Dashboard</h2>
          <p>View the current availability of all registered books.</p>
        </div>
      </section>

      <section className="stats-grid" aria-label="Library statistics">
        <StatCard label="Book Titles" value={books.length} />
        <StatCard label="Total Copies" value={totalCopies} tone="green" />
        <StatCard label="Available Titles" value={availableTitles} tone="purple" />
        <StatCard label="Low Stock" value={lowStockBooks} tone="orange" />
      </section>

      <section className="panel table-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Live stock levels</p>
            <h2>Current Book Availability</h2>
          </div>
        </div>

        {books.length === 0 ? (
          <p className="empty-state">No books are currently registered.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Book Title</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>ISBN</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => {
                  const status = getStatus(book);

                  return (
                    <tr
                      key={book.id}
                      className={book.quantity < 2 ? "low-stock-row" : ""}
                    >
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.genre}</td>
                      <td>{book.isbn}</td>
                      <td>{book.quantity}</td>
                      <td>
                        <span className={`status-label ${status.className}`}>
                          {status.text}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

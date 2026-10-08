function DashboardPage({ books }) {
  const totalTitles = books.length;

  const totalCopies = books.reduce(function (total, book) {
    return total + book.quantity;
  }, 0);

  const lowStockBooks = books.filter(function (book) {
    return book.quantity < 2;
  }).length;

  function getStatus(quantity) {
    if (quantity === 0) {
      return "Out of stock";
    }

    if (quantity < 2) {
      return "Low stock";
    }

    return "Available";
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Overview the current availability of library books.
      </p>

      <div className="statistics">
        <section className="stat-card">
          <h2>{totalTitles}</h2>
          <p>Book Titles</p>
        </section>

        <section className="stat-card">
          <h2>{totalCopies}</h2>
          <p>Total Copies</p>
        </section>

        <section className="stat-card">
          <h2>{lowStockBooks}</h2>
          <p>Low Stock Books</p>
        </section>
      </div>

      <section className="card">
        <h2>Current Book Availability</h2>

        {books.length === 0 ? (
          <p>No books have been registered.</p>
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
                {books.map(function (book) {
                  return (
                    <tr
                      key={book.id}
                      className={
                        book.quantity < 2
                          ? "low-stock"
                          : ""
                      }
                    >
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.genre}</td>
                      <td>{book.isbn}</td>
                      <td>{book.quantity}</td>
                      <td>{getStatus(book.quantity)}</td>
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

export default DashboardPage;
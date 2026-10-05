export default function BookTable({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return (
      <section className="panel table-panel">
        <h2>Registered Books</h2>
        <p className="empty-state">No books have been added yet.</p>
      </section>
    );
  }

  return (
    <section className="panel table-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Library catalogue</p>
          <h2>Registered Books</h2>
        </div>
        <span className="count-badge">{books.length} titles</span>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>ISBN</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.isbn}</td>
                <td>{book.quantity}</td>
                <td>
                  <div className="table-actions">
                    <button
                      className="warning-button"
                      type="button"
                      onClick={() => onEdit(book)}
                    >
                      Update
                    </button>
                    <button
                      className="danger-button"
                      type="button"
                      onClick={() => onDelete(book.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

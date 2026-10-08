function BookList({
  books,
  onDeleteBook,
  onEditBook,
}) {
  function handleDelete(book) {
    const confirmed = window.confirm(
      `Do you want to delete "${book.title}"?`
    );

    if (confirmed) {
      onDeleteBook(book.id);
    }
  }

  return (
    <section className="card">
      <h2>Registered Books</h2>

      {books.length === 0 ? (
        <p>No books have been registered.</p>
      ) : (
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
              {books.map(function (book) {
                return (
                  <tr
                    key={book.id}
                    className={
                      book.quantity < 2 ? "low-stock" : ""
                    }
                  >
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.isbn}</td>
                    <td>{book.quantity}</td>

                    <td>
                      <div className="button-row">
                        <button
                          type="button"
                          className="warning-button"
                          onClick={() => onEditBook(book)}
                        >
                          Update
                        </button>

                        <button
                          type="button"
                          className="danger-button"
                          onClick={() => handleDelete(book)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default BookList;
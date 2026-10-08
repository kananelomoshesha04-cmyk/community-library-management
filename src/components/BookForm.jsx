import { useEffect, useState } from "react";

function BookForm({
  books,
  editingBook,
  onSaveBook,
  onCancelEdit,
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [isbn, setIsbn] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  useEffect(
    function () {
      if (editingBook) {
        setTitle(editingBook.title);
        setAuthor(editingBook.author);
        setGenre(editingBook.genre);
        setIsbn(editingBook.isbn);
        setQuantity(String(editingBook.quantity));
      } else {
        clearForm();
      }
    },
    [editingBook]
  );

  function clearForm() {
    setTitle("");
    setAuthor("");
    setGenre("");
    setIsbn("");
    setQuantity("");
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const quantityNumber = Number(quantity);

    if (
      !title.trim() ||
      !author.trim() ||
      !genre.trim() ||
      !isbn.trim()
    ) {
      setError("Please complete all the fields.");
      return;
    }

    if (
      !Number.isInteger(quantityNumber) ||
      quantityNumber < 0
    ) {
      setError(
        "Quantity must be zero or a positive whole number."
      );
      return;
    }

    const isbnAlreadyExists = books.some(function (book) {
      const sameIsbn =
        book.isbn.toLowerCase() === isbn.trim().toLowerCase();

      const differentBook =
        !editingBook || book.id !== editingBook.id;

      return sameIsbn && differentBook;
    });

    if (isbnAlreadyExists) {
      setError("A book with this ISBN already exists.");
      return;
    }

    const bookDetails = {
      title: title.trim(),
      author: author.trim(),
      genre: genre.trim(),
      isbn: isbn.trim(),
      quantity: quantityNumber,
    };

    if (editingBook) {
      onSaveBook({
        ...editingBook,
        ...bookDetails,
      });
    } else {
      onSaveBook(bookDetails);
    }

    clearForm();
  }

  function handleCancel() {
    clearForm();
    onCancelEdit();
  }

  return (
    <section className="card">
      <h2>
        {editingBook ? "Update Book" : "Add New Book"}
      </h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="book-title">Title</label>

          <input
            id="book-title"
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="book-author">Author</label>

          <input
            id="book-author"
            type="text"
            value={author}
            onChange={(event) =>
              setAuthor(event.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="book-genre">Genre</label>

          <input
            id="book-genre"
            type="text"
            value={genre}
            onChange={(event) =>
              setGenre(event.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="book-isbn">ISBN</label>

          <input
            id="book-isbn"
            type="text"
            value={isbn}
            onChange={(event) =>
              setIsbn(event.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="book-quantity">
            Initial Quantity
          </label>

          <input
            id="book-quantity"
            type="number"
            min="0"
            value={quantity}
            onChange={(event) =>
              setQuantity(event.target.value)
            }
          />
        </div>

        <div className="button-row">
          <button type="submit" className="primary-button">
            {editingBook ? "Save Changes" : "Add Book"}
          </button>

          {editingBook && (
            <button
              type="button"
              className="secondary-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default BookForm;
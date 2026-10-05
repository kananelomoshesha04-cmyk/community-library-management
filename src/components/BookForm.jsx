import { useEffect, useState } from "react";

const emptyBook = {
  title: "",
  author: "",
  genre: "",
  isbn: "",
  quantity: "1",
};

export default function BookForm({ editingBook, books, onSave, onCancel }) {
  const [formData, setFormData] = useState(emptyBook);
  const [error, setError] = useState("");

  // Fill the form when the Update button is selected.
  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title,
        author: editingBook.author,
        genre: editingBook.genre,
        isbn: editingBook.isbn,
        quantity: String(editingBook.quantity),
      });
    } else {
      setFormData(emptyBook);
    }

    setError("");
  }, [editingBook]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cleanedBook = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      genre: formData.genre.trim(),
      isbn: formData.isbn.trim(),
      quantity: Number(formData.quantity),
    };

    if (
      !cleanedBook.title ||
      !cleanedBook.author ||
      !cleanedBook.genre ||
      !cleanedBook.isbn
    ) {
      setError("Please complete all book fields.");
      return;
    }

    if (!Number.isInteger(cleanedBook.quantity) || cleanedBook.quantity < 0) {
      setError("Quantity must be a whole number of zero or more.");
      return;
    }

    const duplicateIsbn = books.some(
      (book) =>
        book.isbn.toLowerCase() === cleanedBook.isbn.toLowerCase() &&
        book.id !== editingBook?.id,
    );

    if (duplicateIsbn) {
      setError("A book with this ISBN already exists.");
      return;
    }

    onSave(cleanedBook);
    setFormData(emptyBook);
    setError("");
  }

  return (
    <form className="panel form-panel" onSubmit={handleSubmit} noValidate>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Book form</p>
          <h2>{editingBook ? "Update Book" : "Add New Book"}</h2>
        </div>
      </div>

      {error && <p className="form-message error">{error}</p>}

      <label className="form-group">
        <span>Title</span>
        <input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter the book title"
        />
      </label>

      <label className="form-group">
        <span>Author</span>
        <input
          name="author"
          type="text"
          value={formData.author}
          onChange={handleChange}
          placeholder="Enter the author's name"
        />
      </label>

      <label className="form-group">
        <span>Genre</span>
        <input
          name="genre"
          type="text"
          value={formData.genre}
          onChange={handleChange}
          placeholder="For example, Fiction"
        />
      </label>

      <label className="form-group">
        <span>ISBN</span>
        <input
          name="isbn"
          type="text"
          value={formData.isbn}
          onChange={handleChange}
          placeholder="Enter the ISBN"
        />
      </label>

      <label className="form-group">
        <span>Initial Quantity</span>
        <input
          name="quantity"
          type="number"
          min="0"
          step="1"
          value={formData.quantity}
          onChange={handleChange}
        />
      </label>

      <div className="button-row">
        <button className="primary-button" type="submit">
          {editingBook ? "Save Changes" : "Add Book"}
        </button>

        {editingBook && (
          <button className="secondary-button" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

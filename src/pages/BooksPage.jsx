import { useState } from "react";
import BookForm from "../components/BookForm";
import BookTable from "../components/BookTable";

export default function BooksPage({
  books,
  onAddBook,
  onUpdateBook,
  onDeleteBook,
}) {
  const [editingBook, setEditingBook] = useState(null);

  function handleSave(bookData) {
    if (editingBook) {
      onUpdateBook(editingBook.id, bookData);
      setEditingBook(null);
    } else {
      onAddBook(bookData);
    }
  }

  function handleDelete(bookId) {
    const selectedBook = books.find((book) => book.id === bookId);

    if (!selectedBook) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${selectedBook.title}"?`,
    );

    if (confirmed) {
      onDeleteBook(bookId);

      if (editingBook?.id === bookId) {
        setEditingBook(null);
      }
    }
  }

  return (
    <div>
      <section className="page-intro">
        <div>
          <p className="eyebrow">Catalogue administration</p>
          <h2>Book Management</h2>
          <p>Add, update and remove books registered in the library.</p>
        </div>
      </section>

      <div className="management-grid">
        <BookForm
          editingBook={editingBook}
          books={books}
          onSave={handleSave}
          onCancel={() => setEditingBook(null)}
        />
        <BookTable
          books={books}
          onEdit={setEditingBook}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

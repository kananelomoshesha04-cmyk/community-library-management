import { useState } from "react";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";

function BooksPage({
  books,
  onAddBook,
  onUpdateBook,
  onDeleteBook,
}) {
  const [editingBook, setEditingBook] = useState(null);

  function handleSaveBook(bookDetails) {
    if (editingBook) {
      onUpdateBook(bookDetails);
      setEditingBook(null);
    } else {
      onAddBook(bookDetails);
    }
  }

  function handleDeleteBook(bookId) {
    onDeleteBook(bookId);

    if (editingBook && editingBook.id === bookId) {
      setEditingBook(null);
    }
  }

  return (
    <div>
      <h1>Book Management</h1>
      <p>Add, update and delete library books.</p>

      <div className="two-column-layout">
        <BookForm
          books={books}
          editingBook={editingBook}
          onSaveBook={handleSaveBook}
          onCancelEdit={() => setEditingBook(null)}
        />

        <BookList
          books={books}
          onEditBook={setEditingBook}
          onDeleteBook={handleDeleteBook}
        />
      </div>
    </div>
  );
}

export default BooksPage;
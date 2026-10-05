import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import useLocalStorage from "./hooks/useLocalStorage";
import DashboardPage from "./pages/DashboardPage";
import BooksPage from "./pages/BooksPage";
import TransactionsPage from "./pages/TransactionsPage";
import UsersPage from "./pages/UsersPage";

const defaultUsers = [
  {
    id: "default-admin",
    name: "Library Administrator",
    membershipId: "ADMIN001",
    role: "Admin",
  },
];

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function App() {
  const [books, setBooks] = useLocalStorage("reactLibraryBooks", []);
  const [transactions, setTransactions] = useLocalStorage(
    "reactLibraryTransactions",
    [],
  );
  const [users, setUsers] = useLocalStorage(
    "reactLibraryUsers",
    defaultUsers,
  );
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  const loggedInUser = useMemo(
    () => users.find((user) => user.id === loggedInUserId) ?? null,
    [loggedInUserId, users],
  );

  // This effect logs out a user if that account no longer exists.
  useEffect(() => {
    if (loggedInUserId !== null && loggedInUser === null) {
      setLoggedInUserId(null);
    }
  }, [loggedInUser, loggedInUserId]);

  function addBook(bookData) {
    setBooks((currentBooks) => [
      ...currentBooks,
      { id: createId(), ...bookData },
    ]);
  }

  function updateBook(bookId, bookData) {
    setBooks((currentBooks) =>
      currentBooks.map((book) =>
        book.id === bookId ? { ...book, ...bookData } : book,
      ),
    );
  }

  function deleteBook(bookId) {
    setBooks((currentBooks) =>
      currentBooks.filter((book) => book.id !== bookId),
    );
  }

  function recordTransaction(bookId, type, quantity) {
    const selectedBook = books.find((book) => book.id === bookId);

    if (!selectedBook) {
      return { success: false, message: "Please select a valid book." };
    }

    if (type === "deduct" && quantity > selectedBook.quantity) {
      return {
        success: false,
        message: `Only ${selectedBook.quantity} copies are available.`,
      };
    }

    const quantityChange = type === "add" ? quantity : -quantity;

    setBooks((currentBooks) =>
      currentBooks.map((book) =>
        book.id === bookId
          ? { ...book, quantity: book.quantity + quantityChange }
          : book,
      ),
    );

    setTransactions((currentTransactions) => [
      {
        id: createId(),
        bookId,
        bookTitle: selectedBook.title,
        type,
        quantity,
        date: new Date().toISOString(),
      },
      ...currentTransactions,
    ]);

    return { success: true, message: "Transaction recorded successfully." };
  }

  function login(membershipId) {
    const normalizedId = membershipId.trim().toUpperCase();
    const matchingUser = users.find(
      (user) => user.membershipId.toUpperCase() === normalizedId,
    );

    if (!matchingUser) {
      return { success: false, message: "Membership ID was not found." };
    }

    setLoggedInUserId(matchingUser.id);
    return { success: true, message: "Login successful." };
  }

  function logout() {
    setLoggedInUserId(null);
  }

  function addUser(userData) {
    setUsers((currentUsers) => [
      ...currentUsers,
      { id: createId(), ...userData },
    ]);
  }

  function updateUser(userId, userData) {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId ? { ...user, ...userData } : user,
      ),
    );
  }

  function deleteUser(userId) {
    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== userId),
    );
  }

  return (
    <Routes>
      <Route
        element={<Layout loggedInUser={loggedInUser} onLogout={logout} />}
      >
        <Route index element={<DashboardPage books={books} />} />
        <Route
          path="books"
          element={
            <BooksPage
              books={books}
              onAddBook={addBook}
              onUpdateBook={updateBook}
              onDeleteBook={deleteBook}
            />
          }
        />
        <Route
          path="transactions"
          element={
            <TransactionsPage
              books={books}
              transactions={transactions}
              onRecordTransaction={recordTransaction}
            />
          }
        />
        <Route
          path="users"
          element={
            <UsersPage
              users={users}
              loggedInUser={loggedInUser}
              onLogin={login}
              onLogout={logout}
              onAddUser={addUser}
              onUpdateUser={updateUser}
              onDeleteUser={deleteUser}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

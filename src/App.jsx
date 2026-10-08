import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import BooksPage from "./pages/BooksPage";
import TransactionsPage from "./pages/TransactionsPage";
import UsersPage from "./pages/UsersPage";

const defaultUsers = [
  {
    id: "admin-1",
    name: "Library Administrator",
    membershipId: "mosh1234",
    role: "Admin",
  },
];

function readLocalStorage(key, defaultValue) {
  try {
    const savedData = localStorage.getItem(key);

    if (savedData) {
      return JSON.parse(savedData);
    }

    return defaultValue;
  } catch {
    return defaultValue;
  }
}

function createId() {
  return `${Date.now()}-${Math.random()}`;
}

function App() {
  const [books, setBooks] = useState(function () {
    return readLocalStorage("libraryBooks", []);
  });

  const [transactions, setTransactions] = useState(function () {
    return readLocalStorage("libraryTransactions", []);
  });

  const [users, setUsers] = useState(function () {
    return readLocalStorage("libraryUsers", defaultUsers);
  });

  const [currentUser, setCurrentUser] = useState(function () {
    return readLocalStorage("libraryCurrentUser", null);
  });

  // Save books whenever the books array changes.
  useEffect(
    function () {
      localStorage.setItem("libraryBooks", JSON.stringify(books));
    },
    [books]
  );

  // Save transactions whenever the transaction array changes.
  useEffect(
    function () {
      localStorage.setItem(
        "libraryTransactions",
        JSON.stringify(transactions)
      );
    },
    [transactions]
  );

  // Save users whenever the users array changes.
  useEffect(
    function () {
      localStorage.setItem("libraryUsers", JSON.stringify(users));
    },
    [users]
  );

  // Save or remove the logged-in user.
  useEffect(
    function () {
      if (currentUser) {
        localStorage.setItem(
          "libraryCurrentUser",
          JSON.stringify(currentUser)
        );
      } else {
        localStorage.removeItem("libraryCurrentUser");
      }
    },
    [currentUser]
  );

  function login(membershipId) {
    const enteredId = membershipId.trim().toLowerCase();

    const foundUser = users.find(function (user) {
      return user.membershipId.toLowerCase() === enteredId;
    });

    if (!foundUser) {
      return false;
    }

    setCurrentUser(foundUser);
    return true;
  }

  function logout() {
    setCurrentUser(null);
  }

  function addBook(bookDetails) {
    const newBook = {
      id: createId(),
      ...bookDetails,
      quantity: Number(bookDetails.quantity),
    };

    setBooks(function (currentBooks) {
      return [...currentBooks, newBook];
    });
  }

  function updateBook(updatedBook) {
    setBooks(function (currentBooks) {
      return currentBooks.map(function (book) {
        if (book.id === updatedBook.id) {
          return {
            ...updatedBook,
            quantity: Number(updatedBook.quantity),
          };
        }

        return book;
      });
    });
  }

  function deleteBook(bookId) {
    setBooks(function (currentBooks) {
      return currentBooks.filter(function (book) {
        return book.id !== bookId;
      });
    });
  }

  function recordTransaction(bookId, transactionType, quantity) {
    const selectedBook = books.find(function (book) {
      return book.id === bookId;
    });

    if (!selectedBook) {
      return {
        success: false,
        message: "Please select a book.",
      };
    }

    const quantityNumber = Number(quantity);

    if (!Number.isInteger(quantityNumber) || quantityNumber <= 0) {
      return {
        success: false,
        message: "Quantity must be a positive whole number.",
      };
    }

    if (
      transactionType === "deduct" &&
      quantityNumber > selectedBook.quantity
    ) {
      return {
        success: false,
        message: "There are not enough copies available.",
      };
    }

    const newQuantity =
      transactionType === "add"
        ? selectedBook.quantity + quantityNumber
        : selectedBook.quantity - quantityNumber;

    setBooks(function (currentBooks) {
      return currentBooks.map(function (book) {
        if (book.id === bookId) {
          return {
            ...book,
            quantity: newQuantity,
          };
        }

        return book;
      });
    });

    const newTransaction = {
      id: createId(),
      date: new Date().toLocaleString(),
      bookTitle: selectedBook.title,
      type:
        transactionType === "add"
          ? "Stock Added"
          : "Book Borrowed",
      quantity: quantityNumber,
    };

    setTransactions(function (currentTransactions) {
      return [newTransaction, ...currentTransactions];
    });

    return {
      success: true,
      message: "Transaction recorded successfully.",
    };
  }

  function addUser(userDetails) {
    const newUser = {
      id: createId(),
      ...userDetails,
    };

    setUsers(function (currentUsers) {
      return [...currentUsers, newUser];
    });
  }

  function updateUser(updatedUser) {
    setUsers(function (currentUsers) {
      return currentUsers.map(function (user) {
        if (user.id === updatedUser.id) {
          return updatedUser;
        }

        return user;
      });
    });

    // Update the session if the administrator updates their own details.
    if (currentUser && currentUser.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }
  }

  function deleteUser(userId) {
    // Do not allow a logged-in user to delete their own account.
    if (currentUser && currentUser.id === userId) {
      return false;
    }

    setUsers(function (currentUsers) {
      return currentUsers.filter(function (user) {
        return user.id !== userId;
      });
    });

    return true;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          currentUser ? (
            <Navigate to="/" replace />
          ) : (
            <LoginPage onLogin={login} />
          )
        }
      />

      <Route
        path="/"
        element={
          currentUser ? (
            <Layout
              currentUser={currentUser}
              onLogout={logout}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route
          index
          element={<DashboardPage books={books} />}
        />

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
              currentUser={currentUser}
              onAddUser={addUser}
              onUpdateUser={updateUser}
              onDeleteUser={deleteUser}
            />
          }
        />
      </Route>

      <Route
        path="*"
        element={
          <Navigate
            to={currentUser ? "/" : "/login"}
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;
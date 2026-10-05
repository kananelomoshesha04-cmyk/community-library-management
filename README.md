# Community Library Management System

This is a beginner-friendly React application for the BIWA2110 Individual Assignment 2.

## Assignment features

- Dashboard with current book availability and low-stock highlighting.
- Add, update and delete books.
- Add stock and deduct borrowed books.
- Transaction history.
- User login.
- Administrator forms for adding, updating and deleting users.
- React Router navigation.
- Controlled React forms with validation.
- React hooks including `useState`, `useEffect` and a custom `useLocalStorage` hook.
- Local Storage persistence.
- Responsive CSS for desktop, tablet and phone screens.

## Default administrator

Use this membership ID on the Users page:

```text
ADMIN001
```

## Run the project on Windows

Open PowerShell inside this project folder and run:

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local address displayed by Vite, usually:

```text
http://localhost:5173/
```

Keep PowerShell open while using the application.

## Project structure

```text
src/
  components/       Reusable forms, tables, layout and cards
  hooks/            Local Storage custom hook
  pages/            Dashboard, Books, Transactions and Users pages
  App.jsx           Application data and routes
  main.jsx          React entry point
  styles.css        Responsive application styling
```

## Important files to explain during marking

- `src/hooks/useLocalStorage.js`: uses `useState` and `useEffect` to save data.
- `src/App.jsx`: contains the main application state and functions.
- `src/components/BookForm.jsx`: demonstrates a controlled form and validation.
- `src/components/UserForm.jsx`: demonstrates reusable controlled inputs.
- `src/pages/DashboardPage.jsx`: displays availability and highlights low stock.
- `src/main.jsx`: starts React and enables React Router.

## Before submitting

1. Test adding, updating and deleting a book.
2. Test adding and borrowing stock.
3. Confirm the transaction history appears.
4. Log in with `ADMIN001`.
5. Test adding, updating and deleting another user.
6. Refresh the browser and confirm that data remains saved.
7. Personalize the title, colors or sample data so you can confidently explain your work.
8. Upload the complete project to GitHub, but do not upload the `node_modules` folder.

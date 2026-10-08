import { NavLink, Outlet } from "react-router-dom";

function Layout({ currentUser, onLogout }) {
  function getLinkClass({ isActive }) {
    return isActive ? "nav-link active" : "nav-link";
  }

  return (
    <div>
      <header className="top-bar">
        <nav className="navigation">
          <NavLink to="/" end className={getLinkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/books" className={getLinkClass}>
            Books
          </NavLink>

          <NavLink
            to="/transactions"
            className={getLinkClass}
          >
            Transactions
          </NavLink>

          <NavLink to="/users" className={getLinkClass}>
            Users
          </NavLink>
        </nav>

        <div className="user-session">
          <strong>{currentUser.role}</strong>

          <button
            type="button"
            className="danger-button"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
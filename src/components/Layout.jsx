import { NavLink, Outlet } from "react-router-dom";

export default function Layout({ loggedInUser, onLogout }) {
  function navClass({ isActive }) {
    return isActive ? "nav-link active" : "nav-link";
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div>
          <p className="eyebrow">Community services</p>
          <h1>Community Library</h1>
        </div>

        {loggedInUser && (
          <div className="session-area">
            <span>{loggedInUser.role}</span>
            <button className="danger-button" type="button" onClick={onLogout}>
              Logout
            </button>
          </div>
        )}
      </header>

      <nav className="navigation" aria-label="Main navigation">
        <NavLink className={navClass} to="/" end>
          Dashboard
        </NavLink>
        <NavLink className={navClass} to="/books">
          Books
        </NavLink>
        <NavLink className={navClass} to="/transactions">
          Transactions
        </NavLink>
        <NavLink className={navClass} to="/users">
          Users
        </NavLink>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

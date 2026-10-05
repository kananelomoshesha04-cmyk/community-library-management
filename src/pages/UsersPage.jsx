import { useState } from "react";
import LoginForm from "../components/LoginForm";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

export default function UsersPage({
  users,
  loggedInUser,
  onLogin,
  onLogout,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
}) {
  const [editingUser, setEditingUser] = useState(null);

  if (!loggedInUser) {
    return (
      <div>
        <section className="page-intro">
          <div>
            <p className="eyebrow">Account access</p>
            <h2>User Management</h2>
            <p>Log in to access your library account.</p>
          </div>
        </section>

        <LoginForm onLogin={onLogin} />
      </div>
    );
  }

  function handleSave(userData) {
    if (editingUser) {
      if (editingUser.id === loggedInUser.id && userData.role !== "Admin") {
        window.alert("You cannot remove your own administrator role.");
        return;
      }

      onUpdateUser(editingUser.id, userData);
      setEditingUser(null);
    } else {
      onAddUser(userData);
    }
  }

  function handleDelete(userId) {
    const selectedUser = users.find((user) => user.id === userId);

    if (!selectedUser) {
      return;
    }

    if (selectedUser.id === loggedInUser.id) {
      window.alert("You cannot delete the account that is currently logged in.");
      return;
    }

    const administrators = users.filter((user) => user.role === "Admin");

    if (selectedUser.role === "Admin" && administrators.length === 1) {
      window.alert("The system must have at least one administrator.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedUser.name}?`,
    );

    if (confirmed) {
      onDeleteUser(userId);

      if (editingUser?.id === userId) {
        setEditingUser(null);
      }
    }
  }

  return (
    <div>
      <section className="page-intro session-intro">
        <div>
          <p className="eyebrow">Account access</p>
          <h2>User Management</h2>
          <p>
            Logged in as <strong>{loggedInUser.name}</strong> ({loggedInUser.role}).
          </p>
        </div>
        <button className="secondary-button" type="button" onClick={onLogout}>
          Logout
        </button>
      </section>

      {loggedInUser.role === "Admin" ? (
        <div className="management-grid">
          <UserForm
            editingUser={editingUser}
            users={users}
            onSave={handleSave}
            onCancel={() => setEditingUser(null)}
          />
          <UserTable
            users={users}
            onEdit={setEditingUser}
            onDelete={handleDelete}
          />
        </div>
      ) : (
        <section className="panel permission-panel">
          <h2>Account Access</h2>
          <p>
            You are logged in successfully. Only administrators can add, update
            or delete user accounts.
          </p>
        </section>
      )}
    </div>
  );
}

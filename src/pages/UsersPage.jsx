import { useState } from "react";
import UserForm from "../components/UserForm";

function UsersPage({
  users,
  currentUser,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
}) {
  const [editingUser, setEditingUser] = useState(null);

  if (currentUser.role !== "Admin") {
    return (
      <div>
        <h1>User Management</h1>

        <section className="card access-message">
          <h2>Administrator access required</h2>

          <p>
            Only an administrator can add, update or delete
            users.
          </p>
        </section>
      </div>
    );
  }

  function handleSaveUser(userDetails) {
    if (editingUser) {
      onUpdateUser(userDetails);
      setEditingUser(null);
    } else {
      onAddUser(userDetails);
    }
  }

  function handleDeleteUser(user) {
    if (user.id === currentUser.id) {
      window.alert(
        "You cannot delete the account you are currently using."
      );
      return;
    }

    const confirmed = window.confirm(
      `Do you want to delete ${user.name}?`
    );

    if (confirmed) {
      onDeleteUser(user.id);

      if (editingUser && editingUser.id === user.id) {
        setEditingUser(null);
      }
    }
  }

  return (
    <div>
      <h1>User Management</h1>

      <p>Add, update and delete library users.</p>

      <div className="two-column-layout">
        <UserForm
          users={users}
          editingUser={editingUser}
          onSaveUser={handleSaveUser}
          onCancelEdit={() => setEditingUser(null)}
        />

        <section className="card">
          <h2>Registered Users</h2>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Membership ID</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map(function (user) {
                  return (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.membershipId}</td>
                      <td>{user.role}</td>

                      <td>
                        <div className="button-row">
                          <button
                            type="button"
                            className="warning-button"
                            onClick={() =>
                              setEditingUser(user)
                            }
                          >
                            Update
                          </button>

                          <button
                            type="button"
                            className="danger-button"
                            disabled={user.id === currentUser.id}
                            onClick={() =>
                              handleDeleteUser(user)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default UsersPage;
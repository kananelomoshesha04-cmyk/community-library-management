import { useEffect, useState } from "react";

function UserForm({
  users,
  editingUser,
  onSaveUser,
  onCancelEdit,
}) {
  const [name, setName] = useState("");
  const [membershipId, setMembershipId] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  useEffect(
    function () {
      if (editingUser) {
        setName(editingUser.name);
        setMembershipId(editingUser.membershipId);
        setRole(editingUser.role);
      } else {
        clearForm();
      }
    },
    [editingUser]
  );

  function clearForm() {
    setName("");
    setMembershipId("");
    setRole("");
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !name.trim() ||
      !membershipId.trim() ||
      !role
    ) {
      setError("Please complete all the fields.");
      return;
    }

    const membershipIdExists = users.some(function (user) {
      const sameMembershipId =
        user.membershipId.toLowerCase() ===
        membershipId.trim().toLowerCase();

      const differentUser =
        !editingUser || user.id !== editingUser.id;

      return sameMembershipId && differentUser;
    });

    if (membershipIdExists) {
      setError("This membership ID is already in use.");
      return;
    }

    const userDetails = {
      name: name.trim(),
      membershipId: membershipId.trim(),
      role: role,
    };

    if (editingUser) {
      onSaveUser({
        ...editingUser,
        ...userDetails,
      });
    } else {
      onSaveUser(userDetails);
    }

    clearForm();
  }

  function handleCancel() {
    clearForm();
    onCancelEdit();
  }

  return (
    <section className="card">
      <h2>
        {editingUser ? "Update User" : "Add New User"}
      </h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="user-name">Full Name</label>

          <input
            id="user-name"
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="membership-id">
            Membership ID
          </label>

          <input
            id="membership-id"
            type="text"
            value={membershipId}
            onChange={(event) =>
              setMembershipId(event.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="user-role">Role</label>

          <select
            id="user-role"
            value={role}
            onChange={(event) =>
              setRole(event.target.value)
            }
          >
            <option value="">Select a role</option>
            <option value="Admin">Admin</option>
            <option value="Librarian">Librarian</option>
          </select>
        </div>

        <div className="button-row">
          <button type="submit" className="primary-button">
            {editingUser ? "Save Changes" : "Add User"}
          </button>

          {editingUser && (
            <button
              type="button"
              className="secondary-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default UserForm;
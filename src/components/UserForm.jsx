import { useEffect, useState } from "react";

const emptyUser = {
  name: "",
  membershipId: "",
  role: "Member",
};

export default function UserForm({ editingUser, users, onSave, onCancel }) {
  const [formData, setFormData] = useState(emptyUser);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name,
        membershipId: editingUser.membershipId,
        role: editingUser.role,
      });
    } else {
      setFormData(emptyUser);
    }

    setError("");
  }, [editingUser]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cleanedUser = {
      name: formData.name.trim(),
      membershipId: formData.membershipId.trim().toUpperCase(),
      role: formData.role,
    };

    if (!cleanedUser.name || !cleanedUser.membershipId || !cleanedUser.role) {
      setError("Please complete all user fields.");
      return;
    }

    const duplicateMembershipId = users.some(
      (user) =>
        user.membershipId.toUpperCase() === cleanedUser.membershipId &&
        user.id !== editingUser?.id,
    );

    if (duplicateMembershipId) {
      setError("This membership ID is already being used.");
      return;
    }

    onSave(cleanedUser);
    setFormData(emptyUser);
    setError("");
  }

  return (
    <form className="panel form-panel" onSubmit={handleSubmit}>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Administrator form</p>
          <h2>{editingUser ? "Update User" : "Add New User"}</h2>
        </div>
      </div>

      {error && <p className="form-message error">{error}</p>}

      <label className="form-group">
        <span>Full Name</span>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter the user's full name"
        />
      </label>

      <label className="form-group">
        <span>Membership ID</span>
        <input
          name="membershipId"
          type="text"
          value={formData.membershipId}
          onChange={handleChange}
          placeholder="For example, LIB001"
        />
      </label>

      <label className="form-group">
        <span>Role</span>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="Member">Member</option>
          <option value="Librarian">Librarian</option>
          <option value="Admin">Administrator</option>
        </select>
      </label>

      <div className="button-row">
        <button className="primary-button" type="submit">
          {editingUser ? "Save Changes" : "Add User"}
        </button>

        {editingUser && (
          <button className="secondary-button" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

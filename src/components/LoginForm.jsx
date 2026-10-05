import { useState } from "react";

export default function LoginForm({ onLogin }) {
  const [membershipId, setMembershipId] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!membershipId.trim()) {
      setError("Please enter a membership ID.");
      return;
    }

    const result = onLogin(membershipId);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setMembershipId("");
    setError("");
  }

  return (
    <form className="panel login-panel" onSubmit={handleSubmit}>
      <p className="eyebrow">Library account</p>
      <h2>User Login</h2>
      <p>Enter your membership ID to continue.</p>

      {error && <p className="form-message error">{error}</p>}

      <label className="form-group">
        <span>Membership ID</span>
        <input
          type="text"
          value={membershipId}
          onChange={(event) => setMembershipId(event.target.value)}
          placeholder="For example, ADMIN001"
        />
      </label>

      <button className="primary-button full-width" type="submit">
        Login
      </button>

      <p className="login-help">
        First administrator login: <strong>ADMIN001</strong>
      </p>
    </form>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const [membershipId, setMembershipId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (!membershipId.trim()) {
      setError("Please enter your membership ID.");
      return;
    }

    const loginSuccessful = onLogin(membershipId);

    if (!loginSuccessful) {
      setError("The membership ID was not found.");
      return;
    }

    setError("");
    navigate("/");
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Welcome to Community Library side</h1>
        <p>Please enter your membership ID to continue.</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-membership-id">
              Membership ID
            </label>

            <input
              id="login-membership-id"
              type="text"
              placeholder="For example, mosh1234"
              value={membershipId}
              onChange={(event) =>
                setMembershipId(event.target.value)
              }
            />
          </div>

          <button type="submit" className="primary-button">
            Login
          </button>
        </form>

        <p className="login-help">
          Please use <strong>mosh1234</strong> As your first administrator ID
        </p>
      </section>
    </main>
  );
}

export default LoginPage;
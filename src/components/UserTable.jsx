export default function UserTable({ users, onEdit, onDelete }) {
  return (
    <section className="panel table-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Library accounts</p>
          <h2>Registered Users</h2>
        </div>
        <span className="count-badge">{users.length} users</span>
      </div>

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
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.membershipId}</td>
                <td>{user.role}</td>
                <td>
                  <div className="table-actions">
                    <button
                      className="warning-button"
                      type="button"
                      onClick={() => onEdit(user)}
                    >
                      Update
                    </button>
                    <button
                      className="danger-button"
                      type="button"
                      onClick={() => onDelete(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

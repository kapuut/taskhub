const STATUSES = ["To Do", "In Progress", "Done"];

function TaskList({ tasks, onDelete, onStatusChange }) {
  if (!tasks.length) {
    return <p className="empty-state">Belum ada task yang sesuai filter.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task._id} className="task-card">
          <div>
            <h3>{task.title}</h3>
            <p>{task.description || "Tanpa deskripsi"}</p>
            <small>
              Dibuat: {new Date(task.createdAt).toLocaleString("id-ID")}
            </small>
          </div>

          <div className="task-card-actions">
            <label htmlFor={`status-${task._id}`}>Status</label>
            <select
              id={`status-${task._id}`}
              value={task.status}
              onChange={(event) =>
                onStatusChange(task._id, { status: event.target.value })
              }
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <button
              className="danger"
              onClick={() => onDelete(task._id)}
              type="button"
            >
              Hapus
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;

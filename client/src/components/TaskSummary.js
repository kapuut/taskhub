function TaskSummary({ tasks }) {
  const total = tasks.length;
  const done = tasks.filter((task) => task.status === "Done").length;
  const inProgress = tasks.filter((task) => task.status === "In Progress").length;
  const toDo = tasks.filter((task) => task.status === "To Do").length;
  const completionRate = total ? Math.round((done / total) * 100) : 0;

  return (
    <section className="task-summary" aria-label="Ringkasan task">
      <article>
        <span>Total Task</span>
        <strong>{total}</strong>
      </article>
      <article>
        <span>To Do</span>
        <strong>{toDo}</strong>
      </article>
      <article>
        <span>In Progress</span>
        <strong>{inProgress}</strong>
      </article>
      <article>
        <span>Done</span>
        <strong>{done}</strong>
      </article>
      <article>
        <span>Completion Rate</span>
        <strong>{completionRate}%</strong>
      </article>
    </section>
  );
}

export default TaskSummary;

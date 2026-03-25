import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import TaskFilters from "./components/TaskFilters";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import {
  createTask,
  deleteTask,
  fetchTasks,
  selectVisibleTasks,
  setSearch,
  setSortBy,
  setStatusFilter,
  updateTask,
} from "./features/tasks/tasksSlice";

const TaskSummary = lazy(() => import("./components/TaskSummary"));

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectVisibleTasks);
  const allTasks = useSelector((state) => state.tasks.items);
  const loadingState = useSelector((state) => state.tasks.status);
  const error = useSelector((state) => state.tasks.error);
  const filters = useSelector((state) => state.tasks.filters);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = (payload) => {
    dispatch(createTask(payload));
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleStatusChange = (id, updates) => {
    dispatch(updateTask({ id, updates }));
  };

  return (
    <main className="app-shell">
      <header className="app-header">
        <p>Collaborative Project Workspace</p>
        <h1>TaskHub - A Collaborative Task Manager</h1>
      </header>

      <section className="layout-grid">
        <TaskForm onSubmit={handleAddTask} />

        <div className="content-panel">
          <TaskFilters
            search={filters.search}
            status={filters.status}
            sortBy={filters.sortBy}
            onSearchChange={(value) => dispatch(setSearch(value))}
            onStatusChange={(value) => dispatch(setStatusFilter(value))}
            onSortChange={(value) => dispatch(setSortBy(value))}
          />

          <Suspense fallback={<p className="loading-text">Memuat ringkasan task...</p>}>
            <TaskSummary tasks={allTasks} />
          </Suspense>

          {loadingState === "loading" && (
            <p className="loading-text">Mengambil data task dari server...</p>
          )}

          {error && <p className="error-text">{error}</p>}

          <TaskList
            tasks={tasks}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
        </div>
      </section>
    </main>
  );
}

export default App;
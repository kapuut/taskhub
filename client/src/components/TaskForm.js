import { useState } from "react";

function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Tambah Task Baru</h2>
      <label htmlFor="title">Judul Task</label>
      <input
        id="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Contoh: Integrasi endpoint task"
      />

      <label htmlFor="description">Deskripsi</label>
      <textarea
        id="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Jelaskan detail task agar tim lebih mudah kolaborasi"
      />

      <button type="submit">Tambah Task</button>
    </form>
  );
}

export default TaskForm;

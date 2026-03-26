const Task = require('../models/Task');
const VALID_STATUSES = ['To Do', 'In Progress', 'Done'];

function sanitizeCreatePayload(body) {
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  const description = typeof body.description === 'string' ? body.description.trim() : '';
  const status = VALID_STATUSES.includes(body.status) ? body.status : 'To Do';

  if (!title) {
    return { error: 'Judul task wajib diisi.' };
  }

  return { value: { title, description, status } };
}

function sanitizeUpdatePayload(body) {
  const updates = {};

  if (Object.prototype.hasOwnProperty.call(body, 'title')) {
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    if (!title) {
      return { error: 'Judul task tidak boleh kosong.' };
    }
    updates.title = title;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'description')) {
    updates.description = typeof body.description === 'string' ? body.description.trim() : '';
  }

  if (Object.prototype.hasOwnProperty.call(body, 'status')) {
    if (!VALID_STATUSES.includes(body.status)) {
      return { error: 'Status task tidak valid.' };
    }
    updates.status = body.status;
  }

  if (!Object.keys(updates).length) {
    return { error: 'Tidak ada data yang bisa diperbarui.' };
  }

  return { value: updates };
}

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil task", error: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const payload = sanitizeCreatePayload(req.body);
    if (payload.error) {
      return res.status(400).json({ message: payload.error });
    }

    const task = await Task.create(payload.value);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Gagal menambahkan task", error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const payload = sanitizeUpdatePayload(req.body);
    if (payload.error) {
      return res.status(400).json({ message: payload.error });
    }

    const task = await Task.findByIdAndUpdate(req.params.id, payload.value, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ message: "Task tidak ditemukan" });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: "Gagal mengubah task", error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task tidak ditemukan" });
    }

    res.json({ message: "Task berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ message: "Gagal menghapus task", error: error.message });
  }
};

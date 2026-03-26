import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "/api";
const API_URL = `${API_BASE_URL}/tasks`;

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Gagal mengambil task dari server.");
  }
  return response.json();
});

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ title, description }) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, status: "To Do" }),
    });

    if (!response.ok) {
      throw new Error("Gagal menambahkan task.");
    }

    return response.json();
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updates }) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error("Gagal mengubah task.");
    }

    return response.json();
  }
);

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Gagal menghapus task.");
  }

  return id;
});

const initialState = {
  items: [],
  status: "idle",
  error: null,
  filters: {
    search: "",
    status: "All",
    sortBy: "newest",
  },
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.filters.search = action.payload;
    },
    setStatusFilter(state, action) {
      state.filters.status = action.payload;
    },
    setSortBy(state, action) {
      state.filters.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task._id !== action.payload);
      });
  },
});

export const { setSearch, setStatusFilter, setSortBy } = tasksSlice.actions;

const selectTaskItems = (state) => state.tasks.items;
const selectTaskFilters = (state) => state.tasks.filters;

export const selectVisibleTasks = createSelector(
  [selectTaskItems, selectTaskFilters],
  (items, filters) => {
    const searchText = filters.search.trim().toLowerCase();

    const filtered = items.filter((task) => {
      const matchSearch =
        task.title?.toLowerCase().includes(searchText) ||
        task.description?.toLowerCase().includes(searchText);
      const matchStatus = filters.status === "All" || task.status === filters.status;

      return matchSearch && matchStatus;
    });

    return [...filtered].sort((a, b) => {
      if (filters.sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      if (filters.sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }

      if (filters.sortBy === "title") {
        return a.title.localeCompare(b.title);
      }

      if (filters.sortBy === "status") {
        return a.status.localeCompare(b.status);
      }

      return 0;
    });
  }
);

export default tasksSlice.reducer;

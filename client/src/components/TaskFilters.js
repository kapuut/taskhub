function TaskFilters({
  search,
  status,
  sortBy,
  onSearchChange,
  onStatusChange,
  onSortChange,
}) {
  return (
    <section className="task-filters" aria-label="Filter dan sorting task">
      <div>
        <label htmlFor="search-task">Cari Task</label>
        <input
          id="search-task"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Cari judul atau deskripsi"
        />
      </div>

      <div>
        <label htmlFor="status-filter">Filter Status</label>
        <select
          id="status-filter"
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <option value="All">Semua</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div>
        <label htmlFor="sort-by">Urutkan</label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="newest">Terbaru</option>
          <option value="oldest">Terlama</option>
          <option value="title">Judul (A-Z)</option>
          <option value="status">Status (A-Z)</option>
        </select>
      </div>
    </section>
  );
}

export default TaskFilters;

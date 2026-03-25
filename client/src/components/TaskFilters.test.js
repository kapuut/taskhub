import { fireEvent, render, screen } from "@testing-library/react";
import TaskFilters from "./TaskFilters";

describe("TaskFilters", () => {
  test("memanggil callback saat filter berubah", () => {
    const onSearchChange = jest.fn();
    const onStatusChange = jest.fn();
    const onSortChange = jest.fn();

    render(
      <TaskFilters
        search=""
        status="All"
        sortBy="newest"
        onSearchChange={onSearchChange}
        onStatusChange={onStatusChange}
        onSortChange={onSortChange}
      />
    );

    fireEvent.change(screen.getByLabelText(/cari task/i), {
      target: { value: "api" },
    });
    fireEvent.change(screen.getByLabelText(/filter status/i), {
      target: { value: "Done" },
    });
    fireEvent.change(screen.getByLabelText(/urutkan/i), {
      target: { value: "title" },
    });

    expect(onSearchChange).toHaveBeenCalledWith("api");
    expect(onStatusChange).toHaveBeenCalledWith("Done");
    expect(onSortChange).toHaveBeenCalledWith("title");
  });
});

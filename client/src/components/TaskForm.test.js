import { fireEvent, render, screen } from "@testing-library/react";
import TaskForm from "./TaskForm";

describe("TaskForm", () => {
  test("mengirim data judul dan deskripsi ketika submit", () => {
    const onSubmit = jest.fn();
    render(<TaskForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/judul task/i), {
      target: { value: "Belajar Redux Toolkit" },
    });
    fireEvent.change(screen.getByLabelText(/deskripsi/i), {
      target: { value: "Membuat slice, store, dan thunk" },
    });

    fireEvent.click(screen.getByRole("button", { name: /tambah task/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: "Belajar Redux Toolkit",
      description: "Membuat slice, store, dan thunk",
    });
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";

test("menampilkan judul dashboard TaskHub", async () => {
  const originalFetch = global.fetch;

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByText(/taskhub - a collaborative task manager/i)).toBeInTheDocument();
  });

  global.fetch = originalFetch;
});

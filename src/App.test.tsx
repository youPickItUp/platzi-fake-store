import { describe, expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  test("loads and displays greeting", async () => {
    render(<App />);

    const tbody = await screen.findByTestId("tableBodyId");
    expect(tbody.children.length).toBe(0);

    await waitFor(async () => {
      const tbody = await screen.findByTestId("tableBodyId");
      // Test if products are loaded
      expect(tbody.children.length).toBeGreaterThan(0);
    });

    const createNewProductButton = screen.getByText("Create new product");
    await userEvent.click(createNewProductButton);

    await waitFor(async () => {
      const categoryIdSelect = await screen.findByLabelText("Category");
      // Test if categories are loaded
      expect(categoryIdSelect.children.length).toBeGreaterThan(1);
    });
  });
});

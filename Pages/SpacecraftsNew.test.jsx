import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SpacecraftsNew from "./SpacecraftsNew";

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("SpacecraftsNew Page Form Validations", () => {
  test("should display a validation error when the name field is submitted blank", () => {
    renderWithRouter(<SpacecraftsNew />);

    const submitButton = screen.getByRole("button", {
      name: /build spacecraft/i,
    });
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText(/name is required\./i);
    expect(errorMessage).toBeInTheDocument();
  });
});

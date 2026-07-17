import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { vi, beforeEach } from "vitest";
import SpacecraftsNew from "./SpacecraftsNew";
import SpaceTravelApi from "../src/services/SpaceTravelApi";

vi.mock("../src/services/SpaceTravelApi", () => ({
  default: {
    buildSpacecraft: vi.fn(),
  },
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("SpacecraftsNew Page Form Validations", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // This resets the API mock before every single test
  });

  // Test 1: The Local Validation Test
  test("should display a validation error when the name field is submitted blank", () => {
    renderWithRouter(<SpacecraftsNew />);

    const submitButton = screen.getByRole("button", {
      name: /build spacecraft/i,
    });
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText(/name is required\./i);
    expect(errorMessage).toBeInTheDocument();
  });

  // Test 2: The Successful "Happy" Path
  test("should successfully build a spacecraft and navigate home when form is valid", async () => {
    // Force our mocked API function to return a successful response
    SpaceTravelApi.buildSpacecraft.mockResolvedValueOnce({ status: 200 });
    const { container } = renderWithRouter(<SpacecraftsNew />);

    // Fill out the Name input field
    const nameInput = container.querySelector('input[name="name"]');
    fireEvent.change(nameInput, { target: { value: "Apollo 18" } });

    // Submit the form
    const submitButton = screen.getByRole("button", {
      name: /build spacecraft/i,
    });
    fireEvent.click(submitButton);

    // Verify the API was called with the correct data
    expect(SpaceTravelApi.buildSpacecraft).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Apollo 18" }),
    );

    // Verify it navigated back to the home route "/"
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  // Test 3: The API Network Error "Unhappy" Path
  test("should display system error component when the API network request fails", async () => {
    // Force our mocked API function to reject/crash
    SpaceTravelApi.buildSpacecraft.mockRejectedValueOnce(
      new Error("Network Failure"),
    );
    const { container } = renderWithRouter(<SpacecraftsNew />);

    // Fill out the Name input field
    const nameInput = container.querySelector('input[name="name"]');
    fireEvent.change(nameInput, { target: { value: "Falcon Heavy" } });

    // Submit the form
    const submitButton = screen.getByRole("button", {
      name: /build spacecraft/i,
    });
    fireEvent.click(submitButton);

    // Verify your <Error /> component is displayed with the custom message
    const apiErrorMessage = await screen.findByText(
      /new spacecraft creation failed\. no new spacecraft added to registry\./i,
    );
    expect(apiErrorMessage).toBeInTheDocument();
  });
});

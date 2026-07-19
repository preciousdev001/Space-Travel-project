import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";
import SpacecraftDetails from "./SpacecraftDetails";
import SpaceTravelApi from "../src/services/SpaceTravelApi";

// ==========================================
// 1. MOCK SETUPS (For API)
// ==========================================

vi.mock("../src/services/SpaceTravelApi", () => ({
  default: {
    getSpacecraftById: vi.fn(),
  },
}));

// Helper function to render the component inside a Route with an ID param
const renderWithRouter = (ui, initialRoute = "/spacecraft/1") => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/spacecraft/:id" element={ui} />
      </Routes>
    </MemoryRouter>,
  );
};

// Mock data for a single spacecraft
const mockShip = {
  id: 1,
  name: "Enterprise",
  capacity: 5,
  description: "Boldly going where no one has gone before.",
};

// ==========================================
// 2. THE TEST SUITE
// ==========================================

describe("SpacecraftDetails Page - Complete Scenarios", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // VARIATION 1: The Loading State
  test("should display system initialization loader initially while fetching details", () => {
    // Keep the API request pending indefinitely
    SpaceTravelApi.getSpacecraftById.mockReturnValue(new Promise(() => {}));

    renderWithRouter(<SpacecraftDetails />);

    // Verify your custom system initialization loading screen is visible
    const loadingElement = screen.getByText(
      /system initialization in progress/i,
    );
    expect(loadingElement).toBeInTheDocument();
  });

  // VARIATION 2: The Success State (Details Loaded)
  test("should fetch and render the spacecraft details correctly", async () => {
    // Mock successful API retrieval
    SpaceTravelApi.getSpacecraftById.mockResolvedValueOnce({
      status: 200,
      data: mockShip,
    });

    renderWithRouter(<SpacecraftDetails />);

    // Verify the API was called with the ID "1" extracted from the path
    expect(SpaceTravelApi.getSpacecraftById).toHaveBeenCalledWith({ id: "1" });

    // Wait for the loader to vanish and details to render
    const shipName = await screen.findByText("Enterprise");
    expect(shipName).toBeInTheDocument();

    // Verify the rest of the spacecraft data renders correctly
    expect(screen.getByText(/5 passengers/i)).toHaveTextContent("5");
    expect(screen.getByText(/Boldly going/i)).toBeInTheDocument();
  });

  // VARIATION 3: The Error State (Network or API Failure)
  test("should display system malfunction banner when the API request fails", async () => {
    // Mock API failure/rejection
    SpaceTravelApi.getSpacecraftById.mockRejectedValueOnce(
      new Error("Database connection lost"),
    );

    renderWithRouter(<SpacecraftDetails />);

    // Verify that your custom error banner pops up
    const errorMessage = await screen.findByText(
      /failed to establish secure connection/i,
    );
    expect(errorMessage).toBeInTheDocument();
  });
});

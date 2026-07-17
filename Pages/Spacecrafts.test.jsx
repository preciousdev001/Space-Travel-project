import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";
import Spacecrafts from "./Spacecrafts";
import SpaceTravelApi from "../src/services/SpaceTravelApi";

// ==========================================
// 1. MOCK SETUPS (For API)
// ==========================================

vi.mock("../src/services/SpaceTravelApi", () => ({
  default: {
    getSpacecrafts: vi.fn(),
    destroySpacecraftById: vi.fn(),
  },
}));

// Helper function to render within Router
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

// Mock data to simulate our fleet
const mockFleet = [
  {
    id: 1,
    name: "Enterprise",
    capacity: 5,
    description: "Boldly going where no one has gone before.",
  },
  {
    id: 2,
    name: "Millennium Falcon",
    capacity: 2,
    description: "Made the Kessel Run in less than twelve parsecs.",
  },
];

// ==========================================
// 2. THE TEST SUITE
// ==========================================

describe("Spacecrafts Page - Complete Scenarios", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // VARIATION 1: The Loading State
  test("should display a loading spinner initially while fetching spacecrafts", () => {
    // We provide a promise that doesn't resolve immediately to force loading state
    SpaceTravelApi.getSpacecrafts.mockReturnValue(new Promise(() => {}));

    renderWithRouter(<Spacecrafts />);

    // Checks that the loading text/spinner is in the DOM
    const loadingElement = screen.getByText(
      /system initialization in progress/i,
    );
    expect(loadingElement).toBeInTheDocument();
  });

  // VARIATION 2: The Success State (Loading multiple spacecrafts)
  test("should load and display all spacecrafts in the fleet", async () => {
    // Mock the API returning our fleet list
    SpaceTravelApi.getSpacecrafts.mockResolvedValueOnce({
      status: 200,
      data: mockFleet,
    });

    renderWithRouter(<Spacecrafts />);

    // Verify loading state is gone and names show up
    const ship1 = await screen.findByText("Enterprise");
    const ship2 = await screen.findByText("Millennium Falcon");

    expect(ship1).toBeInTheDocument();
    expect(ship2).toBeInTheDocument();
  });

  // VARIATION 3: The Decommissioning Action (Destruction)
  test("should delete/decommission a spacecraft when clicking its decommission button", async () => {
    // 1. First call on page load: returns both ships
    SpaceTravelApi.getSpacecrafts.mockResolvedValueOnce({
      status: 200,
      data: mockFleet,
    });

    // Mock the delete API call
    SpaceTravelApi.destroySpacecraftById.mockResolvedValueOnce({ status: 200 });

    // 2. Second call after delete: returns ONLY Millennium Falcon (Enterprise has ID 1)
    const updatedFleet = mockFleet.filter((ship) => ship.id !== 1);
    SpaceTravelApi.getSpacecrafts.mockResolvedValueOnce({
      status: 200,
      data: updatedFleet,
    });

    renderWithRouter(<Spacecrafts />);

    // Wait for the ships to load onto the screen first
    await screen.findByText("Enterprise");
    await screen.findByText("Millennium Falcon");

    // Find and click the first decommission button (for Enterprise)
    const decommissionButtons = screen.getAllByRole("button", {
      name: /decommission/i,
    });
    fireEvent.click(decommissionButtons[0]);

    // Verify the delete API was called with the Enterprise ID
    expect(SpaceTravelApi.destroySpacecraftById).toHaveBeenCalledWith({
      id: 1,
    });

    // Wait for the loader to clear and verify Enterprise is gone
    await waitFor(() => {
      expect(screen.queryByText("Enterprise")).not.toBeInTheDocument();
    });

    // Verify that the Millennium Falcon is successfully displayed after reloading!
    const remainingShip = await screen.findByText("Millennium Falcon");
    expect(remainingShip).toBeInTheDocument();
  });

  // VARIATION 4: The Error State (Network Call Fails)
  test("should display custom error message when fleet network request fails", async () => {
    // Force the API fetching to reject
    SpaceTravelApi.getSpacecrafts.mockRejectedValueOnce(
      new Error("Database offline"),
    );

    renderWithRouter(<Spacecrafts />);

    // Verify that your customized <Error /> component is showing up
    const errorMessage = await screen.findByText(
      /failed to establish secure connection/i,
    );
    expect(errorMessage).toBeInTheDocument();
  });
});

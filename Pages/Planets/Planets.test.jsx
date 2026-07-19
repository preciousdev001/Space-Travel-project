import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";
import Planets from "./Planets";
import SpaceTravelApi from "../../src/services/SpaceTravelApi";

vi.mock("../../src/services/SpaceTravelApi", () => ({
  default: {
    getPlanets: vi.fn(),
    getSpacecrafts: vi.fn(() => Promise.resolve({ status: 200, data: [] })), // Stubbed to prevent crashes
  },
}));

// Helper function to render within Router
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

// Mock dataset for planets registry
const mockPlanets = [
  {
    id: 1,
    name: "Earth",
    currentPopulation: "8 Billion",
  },
  {
    id: 2,
    name: "Mars",
    currentPopulation: "0 (Inhabited by Rovers)",
  },
];

describe("Planets Page - Complete Scenarios", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default fallback so getSpacecrafts doesn't throw a TypeError
    SpaceTravelApi.getSpacecrafts.mockResolvedValue({ status: 200, data: [] });
  });

  // VARIATION 1: The Loader State
  test("should display system initialization loader initially while fetching planets", () => {
    // Keep the planets API request pending indefinitely
    SpaceTravelApi.getPlanets.mockReturnValue(new Promise(() => {}));

    renderWithRouter(<Planets />);

    // Target the specific "SYSTEM INITIALIZATION" text from your shared loader
    const loadingElement = screen.getByText(/system initialization/i);
    expect(loadingElement).toBeInTheDocument();
  });

  // VARIATION 2: The Success State (Planets Loaded)
  test("should load and display all planets from the registry", async () => {
    // Mock successful API response
    SpaceTravelApi.getPlanets.mockResolvedValueOnce({
      status: 200,
      data: mockPlanets,
    });

    renderWithRouter(<Planets />);

    // Wait for the planet text nodes to mount cleanly
    const planet1 = await screen.findByText("Earth");
    const planet2 = await screen.findByText("Mars");

    expect(planet1).toBeInTheDocument();
    expect(planet2).toBeInTheDocument();
  });

  // VARIATION 3: The Error State (Network Call Fails)
  test("should display system malfunction banner when planets request fails", async () => {
    // Force the API call to reject
    SpaceTravelApi.getPlanets.mockRejectedValueOnce(
      new Error("Telemetry link lost"),
    );

    renderWithRouter(<Planets />);

    // MATCHES YOUR EXACT APPLICATION COPY:
    // "Transmission Failed... Could NOT connect to fleet registry."
    const errorMessage = await screen.findByText(
      /could not connect to fleet registry/i,
    );
    expect(errorMessage).toBeInTheDocument();
  });
});

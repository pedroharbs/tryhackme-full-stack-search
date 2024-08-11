import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
  type Mock,
  afterEach,
} from "vitest";
import App from "./app";
import { getCities } from "./services/cities/get-cities";
import { getCountries } from "./services/countries/get-countries";
import { getHotels } from "./services/hotels/get-hotels";

vi.mock("./services/hotels/get-hotels", () => ({
  getHotels: vi.fn(),
}));

vi.mock("./services/countries/get-countries", () => ({
  getCountries: vi.fn(),
}));

vi.mock("./services/cities/get-cities", () => ({
  getCities: vi.fn(),
}));

describe("App", () => {
  beforeEach(() => {
    (getHotels as Mock).mockResolvedValue([
      {
        _id: "66b91d6c25ef0b3b1d7beb86",
        hotelName: "Sheraton Grand Salzburg",
        starRating: 4.5,
      },
    ]);
    (getCountries as Mock).mockResolvedValue([
      {
        _id: "66b91d6c25ef0b3b1d7beb82",
        country: "Austria",
        countryIsoCode: "AT",
      },
    ]);
    (getCities as Mock).mockResolvedValue([
      { _id: "66b91d6c25ef0b3b1d7beb87", name: "Salzburg" },
    ]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render search input", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Search accommodation...");
    expect(input).toBeInTheDocument();
  });

  it("should render the SearchBar and handle input correctly", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Search accommodation...");

    userEvent.type(input, "Salz");

    await waitFor(() => {
      expect(getHotels).toHaveBeenCalledWith("Salz");
      expect(getCountries).toHaveBeenCalledWith("Salz");
      expect(getCities).toHaveBeenCalledWith("Salz");
    });

    expect(screen.getByText("Hotels")).toBeInTheDocument();
    expect(screen.getByText("Countries")).toBeInTheDocument();
    expect(screen.getByText("Cities")).toBeInTheDocument();

    expect(screen.getByText("Sheraton Grand Salzburg")).toBeInTheDocument();
    expect(screen.getByText("Austria (AT)")).toBeInTheDocument();
    expect(screen.getByText("Salzburg")).toBeInTheDocument();
  });

  it("should clear search and hide dropdown", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Search accommodation...");
    userEvent.type(input, "Salz");

    await waitFor(() => {
      expect(screen.getByText("Sheraton Grand Salzburg")).toBeInTheDocument();
    });

    const clearButton = screen.getByTestId("clear-button");
    userEvent.click(clearButton);

    await waitFor(() => {
      expect(input).toHaveValue("");
    });

    expect(
      screen.queryByText("Sheraton Grand Salzburg")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Austria (AT)")).not.toBeInTheDocument();
    expect(screen.queryByText("Salzburg")).not.toBeInTheDocument();
  });
});

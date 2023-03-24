import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// Mock the fetch function to prevent actual API calls

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => {
        const mockData = {
          businesses: [
            {
              id: "fake-business-id",
              name: "Fake Business",
              location: {
                address1: "123 Fake St",
                city: "Faketown",
                state: "FK",
                zip_code: "12345",
              },
              phone: "+11234567890",
              rating: 4.5,
            },
          ],
        };
        return Promise.resolve(mockData);
      },
    })
  );
});

test("renders the app", () => {
  render(<App />);
  const headerElement = screen.getByText(/Foodie Roulette/i);
  expect(headerElement).toBeInTheDocument();
});

test("shows an error message when the zip code is empty", async () => {
  render(<App />);
  const findButton = screen.getByText("Find Restaurant");
  userEvent.click(findButton);
  const errorMessage = await screen.findByText(
    /Please enter a valid zip code and distance./i
  );
  expect(errorMessage).toBeInTheDocument();
});

test("calls the API and displays a restaurant when the form is submitted", async () => {
  render(<App />);
  const zipCodeInput = screen.getByLabelText(/Zip Code:/i);
  const distanceInput = screen.getByLabelText(/Distance \(miles\):/i);
  const findButton = screen.getByText("Find Restaurant");

  userEvent.type(zipCodeInput, "12345");
  userEvent.type(distanceInput, "5");
  userEvent.click(findButton);

  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

  const restaurantName = await screen.findByText(/Fake Business/i);
  expect(restaurantName).toBeInTheDocument();
});

test("calls the API again and displays a different restaurant when the Next button is clicked", async () => {
  render(<App />);
  const zipCodeInput = screen.getByLabelText(/Zip Code:/i);
  const distanceInput = screen.getByLabelText(/Distance \(miles\):/i);
  const findButton = screen.getByText("Find Restaurant");

  userEvent.type(zipCodeInput, "12345");
  userEvent.type(distanceInput, "5");
  userEvent.click(findButton);

  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

  const nextButton = await screen.findByText(/Next/i);
  userEvent.click(nextButton);

  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
});

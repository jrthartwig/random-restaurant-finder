import React, { useState } from "react";
import "./App.css";

const API_BASE_URL = "/api/getRestaurant";

const categories = [
  { alias: "", title: "All" },
  { alias: "italian", title: "Italian" },
  { alias: "chinese", title: "Chinese" },
  { alias: "mexican", title: "Mexican" },
  { alias: "indian", title: "Indian" },
  { alias: "japanese", title: "Japanese" },
  { alias: "american", title: "American" },
  { alias: "thai", title: "Thai" },
  { alias: "pizza", title: "Pizza" },
];

function App() {
  const [zipCode, setZipCode] = useState("");
  const [distance, setDistance] = useState(1);
  const [category, setCategory] = useState("");
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const params = {
    location: zipCode,
    radius: distance * 1609, // Convert miles to meters
    limit: 50,
  };

  if (category) {
    params.categories = category;
  }

  const handleDirectionsClick = () => {
    const { name } = restaurant;
    const address = [
      restaurant.location.address1,
      restaurant.location.city,
      restaurant.location.state,
      restaurant.location.zip_code,
    ].join(", ");

    const url = `https://www.google.com/maps?q=${encodeURIComponent(
      name
    )} ${encodeURIComponent(address)}`;
    window.open(url, "_blank");
  };

  const getRandomRestaurant = async () => {
    try {
      const queryString = new URLSearchParams(params).toString();

      const response = await fetch(`${API_BASE_URL}?${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("querystring", queryString);

      if (!response.ok) {
        throw new Error("Failed to fetch restaurant data. Please try again.");
      }

      const data = await response.json();
      const businesses = data.businesses;

      // Select a random restaurant that hasn't been shown before
      let randomIndex = Math.floor(Math.random() * businesses.length);
      while (businesses[randomIndex] === restaurant) {
        randomIndex = Math.floor(Math.random() * businesses.length);
      }

      setRestaurant(businesses[randomIndex]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setDisabled(true);

    await getRandomRestaurant();

    // Re-enable the button
    setDisabled(false);
  };

  const isValidForm = () => {
    return zipCode.trim() !== "" && distance > 0;
  };

  return (
    <>
      <div className="content">
        <h1>Foodie Roulette</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Zip Code:
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </label>
          <label>
            Distance (miles):
            <input
              type="number"
              min="1"
              max="25"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            />
          </label>
          <label>
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.alias} value={cat.alias}>
                  {cat.title}
                </option>
              ))}
            </select>
          </label>
          {!isValidForm() && (
            <div className="validation-message">
              <p>Please enter a valid zip code and distance.</p>
            </div>
          )}
          <button type="submit" disabled={!isValidForm() || disabled}>
            Find Restaurant
          </button>
        </form>
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        {restaurant && (
          <div className="restaurant-container">
            <h2>{restaurant.name}</h2>
            <p>{restaurant.location.address1}</p>
            <p>
              {restaurant.location.city}, {restaurant.location.state}{" "}
              {restaurant.location.zip_code}
            </p>
            <p>Phone: {restaurant.phone}</p>
            <p>Rating: {restaurant.rating} stars</p>
            <button onClick={() => getRandomRestaurant(params)}>Next</button>
            <button onClick={handleDirectionsClick}>Get Directions</button>
          </div>
        )}
      </div>
      <footer>
        <p>
          © {new Date().getFullYear()} Fort Wayne Nano Dev. All Rights Reserved.
        </p>
        <p>This app was made with the assistance of ChatGPT by OpenAI.</p>
      </footer>
    </>
  );
}

export default App;

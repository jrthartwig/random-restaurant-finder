import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Form from "./components/Form";
import Restaurant from "./components/Restaurant";
import { categories } from "./constants";
import { getRandomRestaurant } from "./utils";

function App() {
  const [zipCode, setZipCode] = useState("");
  const [distance, setDistance] = useState(1);
  const [category, setCategory] = useState("");
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [rating, setRating] = useState("");

  const params = {
    location: zipCode,
    radius: distance * 1609, // Convert miles to meters
    limit: 50,
  };

  if (category) {
    params.categories = category;
  }

  if (rating) {
    params.rating = rating;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setDisabled(true);

    await getRandomRestaurant(params, setRestaurant, setError);

    // Re-enable the button
    setDisabled(false);
  };

  const isValidForm = () => {
    return zipCode.trim() !== "" && distance > 0;
  };

  return (
    <>
      <div className="content">
        <Header />
        <Form
          zipCode={zipCode}
          setZipCode={setZipCode}
          distance={distance}
          setDistance={setDistance}
          category={category}
          setCategory={setCategory}
          rating={rating}
          setRating={setRating}
          handleSubmit={handleSubmit}
          isValidForm={isValidForm}
          disabled={disabled}
          categories={categories}
        />
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        <Restaurant
          restaurant={restaurant}
          getNextRestaurant={getRandomRestaurant(
            params,
            setRestaurant,
            setError
          )}
        />
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

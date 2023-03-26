import React from "react";

function Restaurant({ restaurant, getNextRestaurant, setIsLoading }) {
  if (!restaurant) return null;

  const openGoogleMaps = () => {
    const query = encodeURIComponent(
      `${restaurant.name} ${restaurant.location.address1} ${restaurant.location.city} ${restaurant.location.state} ${restaurant.location.zip_code}`
    );
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, "_blank");
  };

  const handleNextClick = () => {
    setIsLoading(true);
    getNextRestaurant();
  };

  return (
    <div className="restaurant-container">
      <h2>{restaurant.name}</h2>
      <p>{restaurant.location.address1}</p>
      <p>
        {restaurant.location.city}, {restaurant.location.state}{" "}
        {restaurant.location.zip_code}
      </p>
      <p>Phone: {restaurant.phone}</p>
      <p>Rating: {restaurant.rating} stars</p>
      <button onClick={handleNextClick}>Next</button>
      <button onClick={openGoogleMaps}>Get Directions</button>
    </div>
  );
}

export default Restaurant;

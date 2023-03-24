export const getRandomRestaurant = async (params, setRestaurant, setError) => {
  const API_BASE_URL = "/api/getRestaurant";

  try {
    const queryString = new URLSearchParams(params).toString();

    const response = await fetch(`${API_BASE_URL}?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch restaurant data. Please try again.");
    }

    const data = await response.json();
    const businesses = data.businesses;

    // Select a random restaurant that hasn't been shown before
    let randomIndex = Math.floor(Math.random() * businesses.length);
    while (businesses[randomIndex] === setRestaurant) {
      randomIndex = Math.floor(Math.random() * businesses.length);
    }

    setRestaurant(businesses[randomIndex]);
  } catch (err) {
    setError(err.message);
  }
};

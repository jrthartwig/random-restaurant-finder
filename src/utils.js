export const getRandomRestaurant = async (
  params,
  restaurant,
  setRestaurant,
  setError,
  setIsLoading
) => {
  const API_BASE_URL = "/api/getRestaurant";

  try {
    setIsLoading(true);
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

    // Check if there is more than one restaurant in the results
    if (businesses.length > 1) {
      let randomIndex = Math.floor(Math.random() * businesses.length);

      while (
        JSON.stringify(businesses[randomIndex]) === JSON.stringify(restaurant)
      ) {
        randomIndex = Math.floor(Math.random() * businesses.length);
      }

      setRestaurant(businesses[randomIndex]);
    } else {
      setRestaurant(businesses[0]);
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};

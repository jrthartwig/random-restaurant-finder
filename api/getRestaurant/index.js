const axios = require("axios");

const API_KEY = process.env.YELP_API_KEY;

const yelp = axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

module.exports = async function (context, req) {
  const { location, radius, categories, limit } = req.query;

  context.log("Request parameters:", {
    location,
    radius,
    categories,
    limit,
  });

  try {
    const response = await yelp.get("/search", {
      params: {
        location,
        radius,
        categories,
        limit,
      },
    });

    context.res = {
      headers: { "Content-Type": "application/json" },
      body: response.data,
    };
  } catch (error) {
    context.log("Error occurred while fetching data from Yelp API:", error);

    context.res = {
      status: 500,
      body: "Failed to fetch restaurant data. Please try again.",
    };
  }
};

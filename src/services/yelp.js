import axios from "axios";

const API_KEY = process.env.REACT_APP_YELP_API_KEY;

const yelp = axios.create({
  baseURL: "/v3/businesses",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export default yelp;

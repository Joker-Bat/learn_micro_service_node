import axios from "axios";

export default ({ req }) => {
  if (req) {
    // we are on server
    return axios.create({
      baseURL: "http://auth-srv:3000",
      headers: req.headers,
    });
  } else {
    // we are on browser
    return axios.create({
      baseURL: "/",
    });
  }
};

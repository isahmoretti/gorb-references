import axios from "axios";

export default axios.create({
  baseURL: "http://api.paice-io.com",
  headers: {
    "Content-Type": "application/json",
  },
});

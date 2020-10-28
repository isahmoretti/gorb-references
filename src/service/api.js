import axios from "axios";

export default axios.create({
  baseURL:
    "https://cors-anywhere.herokuapp.com/http://viacarreira.com/wp-json/wp/v2/posts",
  headers: {
    "Content-Type": "application/json",
  },
});

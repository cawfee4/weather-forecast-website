import axios from "axios";

axios.defaults.baseURL = "https://weather-forecast-website-xi.vercel.app/api";

axios.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      return res.data;
    }
    return res;
  },
  (error) => {
    return error;
  }
);

export function getWeather(city) {
  return axios.get(`/getCity?city=${city}`);
}

export function getForecast({ city, day }) {
  return axios.get(`/getForecast?city=${city}&day=${day}`);
}

export function subscribeDaily({ address, location }) {
  return axios.post("/subscribeDaily", { address, location });
}

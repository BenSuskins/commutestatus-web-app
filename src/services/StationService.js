import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://commutestatusapi.suskins.co.uk/api/v1/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 10000
});

export default {
  getStations() {
    return apiClient.get("public/stations");
  }
};

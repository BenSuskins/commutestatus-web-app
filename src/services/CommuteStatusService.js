import axios from "axios";
import { getInstance } from "../auth/index";

const apiClient = axios.create({
  baseURL: "https://commutestatusapi.suskins.co.uk/api/v1/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 10000
});

export default {
  getStatuses() {
    const authservice = getInstance();
    return authservice.getIdTokenClaims().then(claims => {
      return apiClient.get("secure/commutestatus", {
        headers: {
          Authorization: "Bearer " + claims.__raw
        }
      });
    });
  }
};

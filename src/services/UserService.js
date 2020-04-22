import axios from "axios";
import { getInstance } from "../auth/index";

const apiClient = axios.create({
  baseURL: process.ENV.VUE_APP_API_ROOT | "http://localhost:8080/api/v1/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 10000
});

export default {
  getUser() {
    const authservice = getInstance();
    return authservice.getIdTokenClaims().then(claims => {
      return apiClient.get("secure/user", {
        headers: {
          Authorization: "Bearer " + claims.__raw
        }
      });
    });
  },
  putUser(request) {
    const authservice = getInstance();
    return authservice.getIdTokenClaims().then(claims => {
      return apiClient.put("secure/user", request, {
        headers: {
          Authorization: "Bearer " + claims.__raw
        }
      });
    });
  }
};

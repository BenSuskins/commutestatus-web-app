import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { getInstance } from "../auth/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    toWork: [],
    toHome: [],
    error: {}
  },
  mutations: {
    SET_STATUS(state, status) {
      state.status = status;
    },
    SET_TO_WORK(state, toWork) {
      state.toWork = toWork;
    },
    SET_TO_HOME(state, toHome) {
      state.toHome = toHome;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  actions: {
    fetchCommuteStatuses(context) {
      //Reset and set status to loading
      context.commit("SET_STATUS", "loading");
      context.commit("SET_TO_WORK", []);
      context.commit("SET_TO_HOME", []);
      context.commit("SET_ERROR", []);

      //Set access token
      const authservice = getInstance();
      authservice.getIdTokenClaims().then(claims => {
        let options = {
          headers: {
            Authorization: "Bearer " + claims.__raw
          }
        };

        //Make api call
        axios
          .get("http://localhost:8080/api/v1/secure/commutestatus", options)
          .then(response => {
            context.commit("SET_STATUS", "");
            context.commit("SET_TO_WORK", response.data.toWork);
            context.commit("SET_TO_HOME", response.data.toHome);
          })
          .catch(error => {
            console.log(error);
            context.commit("SET_STATUS", "errored");
            context.commit("SET_ERROR", error);
          });
      });
    }
  },
  getters: {
    isLoading(state) {
      return state.status === "loading";
    },
    hasErrored(state) {
      return state.status === "errored";
    },
    getError(state) {
      return state.error;
    },
    getToWork(state) {
      return state.toWork;
    },
    getToHome(state) {
      return state.toHome;
    }
  },
  modules: {}
});

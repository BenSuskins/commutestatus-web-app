import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { getInstance } from "../auth/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "loading",
    toWork: [],
    toHome: [],
    error: {},
    user: {}
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
    SET_USER(state, user) {
      state.user = user;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  actions: {
    fetchCommuteStatuses(context) {
      //Reset State
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
    },
    fetchUser(context) {
      //Clear state
      context.commit("SET_USER", {});

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
          .get("http://localhost:8080/api/v1/secure/user", options)
          .then(response => {
            context.commit("SET_USER", response.data);
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
    workStatuses(state) {
      return state.toWork.length;
    },
    homeStatuses(state) {
      return state.toHome.length;
    }
  },
  modules: {}
});

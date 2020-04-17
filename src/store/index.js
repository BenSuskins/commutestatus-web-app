import Vue from "vue";
import Vuex from "vuex";
import UserService from "../services/UserService";
import CommuteStatusService from "../services/CommuteStatusService";

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

      //Call commute status service
      CommuteStatusService.getStatuses()
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
    },
    fetchUser(context) {
      //Clear state
      context.commit("SET_USER", {});

      //Call user service
      UserService.getUser()
        .then(response => {
          context.commit("SET_USER", response.data);
        })
        .catch(error => {
          console.log(error);
          context.commit("SET_STATUS", "errored");
          context.commit("SET_ERROR", error);
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
    getNumberOfWorkStatuses(state) {
      return state.toWork.length;
    },
    getNumberOfHomeStatuses(state) {
      return state.toHome.length;
    },
    getToHome: state => index => {
      return state.toHome[index];
    },
    getToWork: state => index => {
      return state.toWork[index];
    },
    getUser(state) {
      return state.user;
    }
  },
  modules: {}
});

import CommuteStatusService from "@/services/CommuteStatusService";

export const state = {
  status: "loading",
  toWork: [],
  toHome: [],
  error: {}
};
export const mutations = {
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
};
export const actions = {
  fetchCommuteStatuses({ commit }) {
    //Reset State
    commit("SET_STATUS", "loading");
    commit("SET_TO_WORK", []);
    commit("SET_TO_HOME", []);
    commit("SET_ERROR", []);

    //Call commute status service
    CommuteStatusService.getStatuses()
      .then(response => {
        commit("SET_STATUS", "");
        commit("SET_TO_WORK", response.data.toWork);
        commit("SET_TO_HOME", response.data.toHome);
      })
      .catch(error => {
        console.log(error);
        commit("SET_STATUS", "errored");
        commit("SET_ERROR", error);
        throw error;
      });
  }
};
export const getters = {
  isCommuteStatusLoading(state) {
    return state.status === "loading";
  },
  hasCommuteStatusErrored(state) {
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
  }
};

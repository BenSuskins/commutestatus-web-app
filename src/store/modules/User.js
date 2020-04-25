import UserService from "@/services/UserService";

export const state = {
  status: "loading",
  error: {},
  user: {}
};

export const mutations = {
  SET_STATUS(state, status) {
    state.status = status;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  SET_ERROR(state, error) {
    state.error = error;
  }
};
export const actions = {
  fetchUser({ commit }) {
    //Clear state
    commit("SET_STATUS", "loading");
    commit("SET_ERROR", []);

    //Call user service
    UserService.getUser()
      .then(response => {
        commit("SET_STATUS", "");
        commit("SET_USER", response.data);
      })
      .catch(error => {
        console.log(error);
        commit("SET_STATUS", "errored");
        commit("SET_USER", {});
        commit("SET_ERROR", error);
      });
  }
};
export const getters = {
  isUserLoading(state) {
    return state.status === "loading";
  },
  hasUserErrored(state) {
    return state.status === "errored";
  },
  getUser(state) {
    return state.user;
  }
};

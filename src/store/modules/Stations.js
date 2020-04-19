import StationService from "@/services/StationService";

export const state = {
  status: "loading",
  error: {},
  stations: []
};

export const mutations = {
  SET_STATUS(state, status) {
    state.status = status;
  },
  SET_STATIONS(state, stations) {
    state.stations = stations;
  },
  SET_ERROR(state, error) {
    state.error = error;
  }
};
export const actions = {
  fetchStations({ commit }) {
    //Clear state
    commit("SET_STATIONS", {});
    commit("SET_STATUS", "loading");
    commit("SET_ERROR", []);

    //Call stations service
    StationService.getStations()
      .then(response => {
        commit("SET_STATUS", "");
        commit("SET_STATIONS", response.data.stations);
      })
      .catch(error => {
        console.log(error);
        commit("SET_STATUS", "errored");
        commit("SET_ERROR", error);
      });
  }
};
export const getters = {
  isStationsLoading(state) {
    return state.status === "loading";
  },
  hasStationsErrored(state) {
    return state.status === "errored";
  }
};

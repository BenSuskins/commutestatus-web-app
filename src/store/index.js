import Vue from "vue";
import Vuex from "vuex";
import * as user from "./modules/User.js";
import * as commutestatus from "./modules/CommuteStatus.js";
import * as stations from "./modules/Stations.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    commutestatus,
    stations
  }
});

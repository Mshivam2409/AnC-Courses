/** store/index.ts **/
import Vuex from "vuex";
import modules from "./modules";

const debug = process.env.NODE_ENV !== "production";

const createStore = () => {
    return new Vuex.Store({
        modules,
        strict: debug
    });
};

export default createStore;

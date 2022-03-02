import {
  createStore
} from "vuex"
import VuexPersistence from "vuex-persist"
import season from './modules/season';
import drivers from './modules/drivers';
import races from './modules/races';
import constructors from './modules/constructors';
import config from './modules/config';
import cache from './modules/cache';

const persist = new VuexPersistence({
  storage: window.localStorage,
  modules: ['season', 'config']
})

export default createStore({
  modules:{
    season,
    drivers,
    races,
    constructors,
    config,
    cache
  },
  plugins:[persist.plugin]
})
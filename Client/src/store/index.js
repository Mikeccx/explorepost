import Vuex from 'vuex'
import state from './state'
import getter from './getter'
import action from './action'
import mutations from './mutation'
export default new Vuex.Store({
  state,
  getter,
  mutations,
  action
})

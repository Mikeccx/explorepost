import Vuex from 'vuex'
import state from './state'
import getter from './getter'
import action from './action'
import mutation from './mutation'
export const store = new Vuex.Store({
  state,
  getter,
  mutation,
  action
})

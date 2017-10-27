import api from './api'
import { $user } from '@/functions.js'

export const managerService = {

  //get manager
  getManager: function() {
    return api.post('/manager/getLogged', { token: $user.token })
  },

  //add new manager
  createManager: function(manager) {
    return api.post('/manager/add', { ...manager, token: $user.token })
  },


}

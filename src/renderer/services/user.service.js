import api from './api'
import { $user } from '@/functions.js'
var sha256 = require('js-sha256');

export const userService = {

  //log in
  logIn: function(user) {
    let params = {
      login: user.login,
      pass: sha256(user.pass),

    }
    return api.post('/auth/login', params)
  },

  //log out
  logOut: function() {
    return api.post('/auth/logout', { token: $user.token })
  },

  //sign up
  signUp: function(user) {
    let params = {
      login: user.login,
      pass: sha256(user.pass),
      repass: sha256(user.repass),
      passlen: user.pass.length
    }
    return api.post('/auth/register',params);
  },

  //is logged?
  isLogged: function(user) {
    return api.post('/auth/isLogged')
  }

}

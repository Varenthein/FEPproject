import api from './api'

export const clubService = {
  getClubs: function() {
    return api.get('/clubs')
  },

  getClubsByLeague: function(leagueId) {
    return api.get('/clubs/'+leagueId)
  },

  getClubById: function(clubId) {
    return api.get('/club/'+clubId)
  }
}

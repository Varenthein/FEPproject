import api from './api'

export const playerService = {

  getPlayersByClub: function(clubId) {
    return api.get('/players/'+clubId);
  }
}

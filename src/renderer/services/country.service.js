import api from './api'

export const countryService = {
  getCountries: function() {
    return api.get('/countries')
  }
}

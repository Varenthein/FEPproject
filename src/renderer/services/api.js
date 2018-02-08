import axios from 'axios'
export default axios.create({
  baseURL: 'http://sofagol.pl/FEP/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
})

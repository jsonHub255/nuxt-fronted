// services/driverService.js
import axios from 'axios';

const API_BASE_URL = 'https://calm-refuge-29022-6081e5df5b91.herokuapp.com/api/v1';

export function fetchDrivers(searchQuery = '', page = 1) {
  return axios.get(`${API_BASE_URL}/drivers/?search=${searchQuery}&page=${page}`)
    .then(response => response.data)
    .catch(error => {
      console.error("Failed to fetch drivers:", error);
      throw error;
    });
}
// services/locationService.js
import axios from 'axios';

const API_BASE_URL = 'https://calm-refuge-29022-6081e5df5b91.herokuapp.com/api/v1';

export function fetchLocations(searchQuery = '', page = 1) {
  return axios.get(`${API_BASE_URL}/locations/?search=${searchQuery}&page=${page}`)
    .then(response => response.data)
    .catch(error => {
      console.error("Failed to fetch locations:", error);
      throw error;
    });
}

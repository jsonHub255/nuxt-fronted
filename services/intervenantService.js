// services/intervenantService.js
import axios from 'axios';

const API_BASE_URL = 'https://calm-refuge-29022-6081e5df5b91.herokuapp.com/api/v1';

export function fetchIntervenants() {
  return axios.get(`${API_BASE_URL}/intervenants/`)
    .then(response => response.data)
    .catch(error => {
      console.error("Failed to fetch intervenants:", error);
      throw error;
    });
}
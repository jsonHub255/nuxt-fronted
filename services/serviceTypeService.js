// services/serviceTypeService.js
import axios from 'axios';

const API_BASE_URL = 'https://calm-refuge-29022-6081e5df5b91.herokuapp.com/api/v1';

export function fetchServiceTypes() {
  return axios.get(`${API_BASE_URL}/service-types/`)
    .then(response => response.data)
    .catch(error => {
      console.error("Failed to fetch service types:", error);
      throw error;
    });
}
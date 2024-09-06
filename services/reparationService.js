// fronted_nuxt/services/reparationService.js
import { useNuxtApp } from '#app';

const API_BASE_URL = 'https://calm-refuge-29022-6081e5df5b91.herokuapp.com/api/v1';

export function fetchReparations() {
  const { $api } = useNuxtApp();
  return $api.get(`${API_BASE_URL}/reparations/`)
    .then(response => response.data)
    .catch(error => {
      console.error("Failed to fetch reparations:", error);
      throw error;
    });
}

export function getReparationById(reparationId) {
  const { $api } = useNuxtApp();
  return $api.get(`${API_BASE_URL}/reparations/${reparationId}/`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Failed to fetch reparation with ID: ${reparationId}`, error);
      throw error;
    });
}

export function createReparation(reparationData) {
  const { $api } = useNuxtApp();
  console.log('Full reparation data being sent:', JSON.stringify(reparationData, null, 2));
  console.log('Sending reparation data to server:', reparationData);
  return $api.post(`${API_BASE_URL}/reparations/`, reparationData)
    .then(response => {
      console.log('Received response from server:', response);
      if (response.status !== 201) {
        console.warn('Unexpected status code:', response.status);
      }
      if (typeof response.data === 'string' && response.data.startsWith('<!DOCTYPE html>')) {
        throw new Error('Received HTML response instead of JSON');
      }
      return response.data;
    })
    .catch(error => {
      console.error("Failed to create reparation:", error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      throw error;
    });
}


export function updateReparation(reparationId, reparationData) {
  const { $api } = useNuxtApp();
  return $api.put(`${API_BASE_URL}/reparations/${reparationId}/`, reparationData)
    .then(response => response.data)
    .catch(error => {
      console.error(`Failed to update reparation with ID: ${reparationId}`, error);
      throw error;
    });
}

export function deleteReparation(reparationId) {
  const { $api } = useNuxtApp();
  return $api.delete(`${API_BASE_URL}/reparations/${reparationId}/`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Failed to delete reparation with ID: ${reparationId}`, error);
      throw error;
    });
}

import { useNuxtApp } from '#app';

export function fetchReparations() {
  const { $api } = useNuxtApp();

  return $api.get('/reparations')
    .then(response => response.data)
    .catch(error => {
      console.error("Failed to fetch reparations:", error);
      throw error;
    });
}

export function getReparationById(reparationId) {
  const { $api } = useNuxtApp();

  return $api.get(`/reparations/${reparationId}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Failed to fetch reparation with ID: ${reparationId}`, error);
      throw error;
    });
}

export function createReparation(reparationData) {
  const { $api } = useNuxtApp();

  return $api.post('/reparations', reparationData)
    .then(response => response.data)
    .catch(error => {
      console.error("Failed to create reparation:", error);
      throw error;
    });
}

export function updateReparation(reparationId, reparationData) {
  const { $api } = useNuxtApp();

  return $api.put(`/reparations/${reparationId}`, reparationData)
    .then(response => response.data)
    .catch(error => {
      console.error(`Failed to update reparation with ID: ${reparationId}`, error);
      throw error;
    });
}

export function deleteReparation(reparationId) {
  const { $api } = useNuxtApp();

  return $api.delete(`/reparations/${reparationId}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Failed to delete reparation with ID: ${reparationId}`, error);
      throw error;
    });
}

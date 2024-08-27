import { useApi } from '~/plugins/axios';

export function fetchOrders() {
  return useApi().get('/orders')
    .then(response => response.data)
    .catch(error => {
      console.error("Failed to fetch orders:", error);
      throw error;
    });
}

export function getOrderById(orderId) {
  return useApi().get(`/orders/${orderId}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Failed to fetch order with ID: ${orderId}`, error);
      throw error;
    });
}

export function createOrder(orderData) {
  return useApi().post('/orders', orderData)
    .then(response => response.data)
    .catch(error => {
      console.error("Failed to create order:", error);
      throw error;
    });
}

export function updateOrder(orderId, orderData) {
  return useApi().put(`/orders/${orderId}`, orderData)
    .then(response => response.data)
    .catch(error => {
      console.error(`Failed to update order with ID: ${orderId}`, error);
      throw error;
    });
}

export function deleteOrder(orderId) {
  return useApi().delete(`/orders/${orderId}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Failed to delete order with ID: ${orderId}`, error);
      throw error;
    });
}

import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const fetchProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

export const fetchTables = async () => {
  const response = await axios.get(`${API_BASE_URL}/tables`);
  return response.data;
};

export const fetchOrders = async () => {
  const response = await axios.get(`${API_BASE_URL}/orders`);
  return response.data;
};

export const createOrder = async (order) => {
  const response = await axios.post(`${API_BASE_URL}/orders`, order);
  return response.data;
};

export const fetchHistory = async () => {
  const response = await axios.get(`${API_BASE_URL}/history`);
  return response.data;
};

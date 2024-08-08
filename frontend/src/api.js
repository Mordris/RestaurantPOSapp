import axios from "axios";

// Centralized Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000, // Set a timeout for requests
});

const handleError = (error) => {
  // Log error to an external service if needed
  console.error("API call failed:", error);
  throw new Error(error.response?.data?.message || "An error occurred");
};

export const fetchProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchTables = async () => {
  try {
    const response = await api.get("/tables");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchOrders = async () => {
  try {
    const response = await api.get("/orders");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createOrder = async (order) => {
  try {
    const response = await api.post("/orders", order);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchHistory = async (page = 1, limit = 20) => {
  try {
    const response = await api.get(`/history?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

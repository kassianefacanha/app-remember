// services/authService.js
import axios from 'axios';
import Config from 'react-native-config';

const apiClient = axios.create({
  baseURL: Config.API_BASE_URL || 'http://10.0.0.19:5000', 
});

// Função para fazer login
export const login = async (username, password) => {
  try {
    const response = await apiClient.post('/users/login', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Função para fazer signup
export const signup = async ({ username, email, name, city, street, neighborhood, number, cep, password }) => {
  try {
    const response = await apiClient.post('/users', { 
      username,
      email,
      name,
      city,
      street,
      neighborhood,
      number,
      cep,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

import axios from 'axios';
import { LoginDto, RegisterDTO } from '../models/Dtos';

const BASE_API = "http://localhost:8200/auth"

export const registerUser = async (data: RegisterDTO) => {
  const response = await axios.post(`${BASE_API}/register`, data);
  return response.data;
};

export const loginUser = async (data: LoginDto) => {
  const response = await axios.post(`${BASE_API}/login`, data);
  return response.data;
};

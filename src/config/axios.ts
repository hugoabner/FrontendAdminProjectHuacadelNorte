import axios from "axios";
 
const API_URL = 'http://localhost:5000';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
	"Content-Type": "application/json",
  },
});


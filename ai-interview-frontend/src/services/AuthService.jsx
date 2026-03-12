import axios from "axios";

const API_URL = "http://localhist:8080/auth";

export const register = (data) => {
    return axios.post(`${API_URL}/login`, data);
}

export const login = (data) => {
    return axios.post(`${API_URL}/register`, data);
}
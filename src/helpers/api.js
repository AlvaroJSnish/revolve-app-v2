import axios from "axios";

function getHeaders(headers = {}) {
  const token = localStorage.getItem("access_token");

  return {
    ...headers,
    ...(token && { Authorization: `Token ${token}` }),
  };
}

export function get(endpoint = "", data = {}, options = {}, headers = {}) {
  return axios.get(`http://localhost:8000/api/v1/${endpoint}`, {
    ...options,
    data: { ...data },
    headers: getHeaders(headers),
  });
}

export function post(endpoint = "", data = {}, options = {}, headers = {}) {
  return axios.post(`http://localhost:8000/api/v1/${endpoint}`, data, {
    ...options,
    headers: getHeaders(headers),
  });
}

export function put(endpoint = "", data = {}, options = {}, headers = {}) {
  return axios.put(`http://localhost:8000/api/v1/${endpoint}`, data, {
    ...options,
    headers: getHeaders(headers),
  });
}

export function deletes(endpoint = "", options = {}, headers = {}) {
  return axios.delete(`http://localhost:8000/api/v1/${endpoint}`, {
    ...options,
    headers: getHeaders(headers),
  });
}

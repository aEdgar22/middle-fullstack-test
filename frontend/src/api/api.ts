import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/', // Asegúrate de cambiarlo si tu backend está en otro puerto/servidor
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

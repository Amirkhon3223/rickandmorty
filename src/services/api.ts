import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

export const getCharacters = (page = 1, name = '', status = '') => {
  return api.get(`/character`, {
    params: { page, name, status }
  })
}
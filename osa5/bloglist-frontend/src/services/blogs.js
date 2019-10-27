import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null 

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (updated, id) => {
  const url = baseUrl + '/' + id
  const response = await axios.put(url, updated)
  return response.data
}

const remove = async (id) => {
  const url = baseUrl + '/' + id
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(url, config)
  return response.data
}


export default { getAll, create, setToken, update, remove}
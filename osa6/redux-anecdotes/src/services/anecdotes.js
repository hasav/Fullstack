import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content) => {
    const object = { content: content, votes: 0}
    const response = await axios.post(url, object)
    return response.data
}

const update = async (updated, id) => {
    const anecdoteUrl = url + '/' + id
    const response = await axios.put(anecdoteUrl, updated)
    return response 
}
export default { getAll, createNew, update }
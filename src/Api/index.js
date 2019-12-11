import Axios from 'axios';

const API = Axios.create({ baseURL: 'localhost:3000' })

export const ValidWord = (word) => {
  return API.get(`/word/check?word=${word}`)
}
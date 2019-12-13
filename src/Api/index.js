import Axios from 'axios';

const API = Axios.create({ baseURL: 'http://localhost:3000/' })

export const ValidWord = (word) => {

  return API.get(`?word=${word}`,{
    headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
	}})
}
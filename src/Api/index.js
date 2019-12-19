import Axios from 'axios';

const API = Axios.create({ baseURL:  process.env.REACT_APP_API })

export const ValidWord = (word) => {

  return API.get(`?word=${word}`,{
    headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
	}})
}
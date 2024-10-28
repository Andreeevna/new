import axios from 'axios'

export const instance = axios.create({
	baseURL: 'http://192.168.156.16:8100',
})

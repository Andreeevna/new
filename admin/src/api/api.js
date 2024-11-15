import axios from 'axios'
import toast from 'react-hot-toast'

export const instance = axios.create({
	baseURL: 'http://192.168.156.16:8100',
	validateStatus: status => {
		return status >= 200 && status < 500
	},
})

instance.interceptors.response.use(response => {
	if (response.status >= 400) {
		toast.error(response.data.message)
	} else {
		toast.success(response.data.message)
	}

	return response
})

import { instance } from './api'

export const getAPI = {
	getClients(formState) {
		return instance.post(`/admin/api/get/clients`, JSON.stringify(formState), {
			headers: {
				'Content-Type': 'application/json',
			},
		})
	},
}

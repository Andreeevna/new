import { instance } from './api'

export const getAPI = {
	getClients(formState) {
		return instance.post(`/admin/api/get/clients`, JSON.stringify(formState), {
			headers: {
				'Content-Type': 'application/json',
			},
		})
	},
	getUsers(formStateUsers) {
		return instance.post(
			`/admin/api/get/users`,
			JSON.stringify(formStateUsers),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	},
	getLogins(formStateLogins) {
		return instance.post(
			`/admin/api/get/logins`,
			JSON.stringify(formStateLogins),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	},
}

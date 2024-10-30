import { instance } from './api'

export const deleteAPI = {
	deleteUser(formStateUser) {
		return instance.post(
			`/admin/api/delete/user`,
			JSON.stringify(formStateUser),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	},
	deleteClient(formStateClient) {
		return instance.post(
			`/admin/api/delete/client`,
			JSON.stringify(formStateClient),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	},
}

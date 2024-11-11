import { instance } from './api'

export const updateApi = {
	updateClients(formStateUpdate) {
		return instance.post(
			`/admin/api/update/clients`,
			JSON.stringify(formStateUpdate),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	},
	updateUsers(formStateUpdate) {
		return instance.post(
			`/admin/api/update/users`,
			JSON.stringify(formStateUpdate),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	},

	updateLogin(formStateUpdate) {
		return instance.post(
			`/admin/api/update/logins`,
			JSON.stringify(formStateUpdate),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	},
}

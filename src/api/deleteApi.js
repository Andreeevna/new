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

	deleteUsers(formStateUsers) {
		return instance.post(
			`/admin/api/delete/users`,
			JSON.stringify(formStateUsers),
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

	deleteClients(formStateClients) {
		return instance.post(
			`/admin/api/delete/clients`,
			JSON.stringify(formStateClients),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	},

	deleteLogin(formStateDeleteLogin) {
		return instance.post(
			`/admin/api/delete/login`,
			JSON.stringify(formStateDeleteLogin),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	},

	deleteLogins(formStateDeleteLogins) {
		return instance.post(
			`/admin/api/delete/logins`,
			JSON.stringify(formStateDeleteLogins),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	},
}

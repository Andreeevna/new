import { instance } from './api'

export const createAPI = {
	createClient(formStateCreate) {
		return instance.post(
			`/admin/api/create/client`,
			JSON.stringify(formStateCreate),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	},

	createUser(formStateCreate) {
		return instance.post(
			`/admin/api/create/user`,
			JSON.stringify(formStateCreate),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	},

	createLogin(formStateCreateLogin) {
		return instance.post(
			`/admin/api/create/login/combined`,
			JSON.stringify(formStateCreateLogin),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	},
}

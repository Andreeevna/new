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
}
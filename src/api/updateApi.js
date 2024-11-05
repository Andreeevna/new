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
}

import { rows_users, rowsClients } from './utils'

export const getProductById = (itemId, chapter) => {
	if (chapter === 'users') {
		return rows_users.find(row => {
			if (row.id === Number(itemId)) {
				return row
			}
		})
	}
	if (chapter === 'clients') {
		return rowsClients.find(row => {
			if (row.id === Number(itemId)) {
				return row
			}
		})
	}
}

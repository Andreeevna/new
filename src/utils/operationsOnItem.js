import { rows_users, rowsClients, rowsCodeLogins, rowsSmsLogins } from './utils'

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

	if (chapter === 'loginsms') {
		return rowsSmsLogins.find(row => {
			if (row.id === Number(itemId)) {
				return row
			}
		})
	}

	if (chapter === 'logincode') {
		return rowsCodeLogins.find(row => {
			if (row.id === Number(itemId)) {
				return row
			}
		})
	}
}

import {
	rows_users,
	rowsCallLogins,
	rowsClients,
	rowsCodeLogins,
	rowsPushLogins,
	rowsSmsLogins,
} from './utils'

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

	if (chapter === 'logincall') {
		return rowsCallLogins.find(row => {
			if (row.id === Number(itemId)) {
				return row
			}
		})
	}

	if (chapter === 'loginpush') {
		return rowsPushLogins.find(row => {
			if (row.id === Number(itemId)) {
				return row
			}
		})
	}
}

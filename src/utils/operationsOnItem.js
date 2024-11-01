import { useSelector } from 'react-redux'

export const getProductById = (itemId, chapter) => {
	const userRows = useSelector(state => state.users.users)
	const clientRows = useSelector(state => state.clients.clients)
	const loginRows = useSelector(state => state.logins.logins)

	if (chapter === 'users') {
		return userRows?.find(row => {
			if (row.id === Number(itemId)) {
				return row
			}
		})
	}
	if (chapter === 'clients') {
		return clientRows?.find(row => {
			if (row.id === Number(itemId)) {
				return row
			}
		})
	}

	if (chapter === 'login') {
		return loginRows?.find(row => {
			if (row.login.id === Number(itemId)) {
				return row
			}
		})
	}
}

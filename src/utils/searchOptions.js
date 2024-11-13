export const createOptionsForClients = ({ logins, essence }) => {
	return logins.reduce((acc, item) => {
		const label = item[essence].id
		const name = item[essence].name

		const existingItem = acc.find(i => i.label === label)
		if (!existingItem) {
			acc.push({ label, name })
		}

		return acc
	}, [])
}
// console.log(createOptionsForClients({ logins, essence: 'client' }))

export const createOptionsForUsers = ({ users, id }) => {
	let options = []

	users.forEach(item => {
		const existingItem = options.find(i => {
			return +i.label === item.id
		})
		if (!existingItem) {
			// if (+item.client.id === +id && !existingItem) {

			options.push({
				label: `${item.id}`,
				name: `${item.id}, ${item.username}`,
			})
		}
	})

	return options.slice().sort((a, b) => {
		if (a.label === id.toString()) {
			return -1
		}
		if (b.label === id.toString()) {
			return 1
		}
		return a.label.localeCompare(b.label)
	})
}

// console.log(createOptionsForUsers({ logins, id: 38, essence: 'user' }))

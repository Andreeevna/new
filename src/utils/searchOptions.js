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

export const createOptionsForUsers = ({ logins, id, essence }) => {
	let options = []

	logins.forEach(item => {
		const existingItem = options.find(i => {
			// console.log(+i.label, item[essence].id)
			return +i.label === item[essence].id
		})
		if (+item.client.id === +id && !existingItem) {
			options.push({
				label: `${item[essence].id}`,
				name: `${item[essence].id}, ${item[essence].username}`,
			})
		}
	})

	return options
}

// console.log(createOptionsForUsers({ logins, id: 38, essence: 'user' }))

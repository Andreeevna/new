import axios from 'axios'
import { BX24 } from 'bx24'

function getCurrentUser() {
	const bx24 = new BX24()
	const urlParams = new URLSearchParams(window.location.search)
	const protocol = urlParams.get('PROTOCOL') === '0' ? 'https' : 'https'
	const domain = urlParams.get('DOMAIN')
	const baseUrl = `${protocol}://${domain}`

	const currentUserPromise = new Promise((resolve, reject) => {
		bx24
			.getAuth()
			.then(auth => {
				console.log(auth)
				if (!auth || !auth.ACCESS_TOKEN) {
					return reject(new Error('Authentication failed: No access token'))
				}

				return axios({
					method: 'get',
					url: `${baseUrl}/rest/user.current?auth=${auth.ACCESS_TOKEN}`,
				})
			})
			.then(response => {
				if (response.data.error) {
					return reject(
						new Error(`API Error: ${response.data.error_description}`)
					)
				}
				// console.log(response.data.result)
				resolve(response.data.result)
			})
			.catch(error => {
				reject(error)
			})
	})

	return currentUserPromise
}

export default getCurrentUser

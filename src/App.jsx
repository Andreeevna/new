import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './App.css'

import Layout from './components/Layout/Layout'
import ClientsPage from './pages/ClientsPage/ClientsPage'
import EditPage from './pages/EditPage/EditPage'
import LoginPage from './pages/LoginPage/LoginPage'
import UsersPage from './pages/UsersPage/UsersPage'

import {
	changeUserId,
	changeUserInitials,
} from './redux/slices/adminBxSlice/adminBxSlice'
import { getAdminClients } from './redux/slices/adminClientsSlice/adminClientsSlice'
import { getAdminLogins } from './redux/slices/adminLoginSlice/adminLoginSlice'
import { getAdminUsers } from './redux/slices/adminUsersSlice/adminUsersSlice'
import { getUserInitials } from './utils/bx/bxEmploee'
import getCurrentUser from './utils/bx/current'

function App() {
	const dispatch = useDispatch()

	const userID = useSelector(state => state.bx.userId)
	const initials = useSelector(state => state.bx.initials)

	const secretKey = getUserInitials(
		initials.NAME,
		initials.LAST_NAME,
		initials.SECOND_NAME
	)

	// console.log(userID)
	// console.log(initials)
	// console.log(secretKey)

	const formState = {
		bitrix_id: userID,
		secret_key: `${secretKey}`,
		name: null,
		login_type: null,
	}

	const formStateUsers = {
		bitrix_id: userID,
		secret_key: `${secretKey}`,
		user_bitrix_id: null,
		username: null,
	}

	const formStateLogins = {
		bitrix_id: userID,
		secret_key: `${secretKey}`,
		login_type: null,
		users_list: null,
		clients_list: null,
	}

	const [dataReady, setDataReady] = useState(false)

	const initProject = async response => {
		await dispatch(changeUserId(response.ID))
		await dispatch(
			changeUserInitials({
				NAME: response.NAME,
				LAST_NAME: response.LAST_NAME,
				SECOND_NAME: response.SECOND_NAME,
			})
		)
		setDataReady(true)
	}

	useEffect(() => {
		initProject({
			ID: '225',
			NAME: 'Борис',
			LAST_NAME: 'Смородин',
			SECOND_NAME: 'Борисович',
		})
	}, [])

	useEffect(() => {
		getCurrentUser().then(response => {
			console.log(response)
			// initProject(response)
		})
	}, [])

	useEffect(() => {
		if (dataReady) {
			dispatch(getAdminClients({ formState }))
			dispatch(getAdminUsers({ formStateUsers }))
			dispatch(getAdminLogins({ formStateLogins })).then(resp => {
				if (resp.payload) {
					// console.log(resp)
					// window.alert('Загрузка прошла')
				}
				// console.log(resp)
			})
		}
	}, [dataReady])

	const router = createBrowserRouter([
		{
			path: '/',
			element: <Layout />,

			children: [
				{
					path: '/users',
					element: <UsersPage />,
				},
				{
					path: '/clients',
					element: <ClientsPage />,
				},
				{
					path: '/edit/:id?/:chapter?',
					element: <EditPage />,
				},
				{
					path: '/logins',
					element: <LoginPage />,
				},
			],
		},
	])
	return (
		<>
			<RouterProvider router={router} />
			<Toaster
				position='top-right'
				reverseOrder={false}
				toastOptions={{
					className: '',
					style: {
						marginBottom: '5px',
					},
				}}
			/>
		</>
	)
}

export default App

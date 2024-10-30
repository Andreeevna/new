import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'
import ClientsPage from './pages/ClientsPage/ClientsPage'
import EditPage from './pages/EditPage/EditPage'
import LoginPage from './pages/LoginPage/LoginPage'
import UsersPage from './pages/UsersPage/UsersPage'
import { getAdminClients } from './redux/slices/adminClientsSlice/adminClientsSlice'
import { getAdminLogins } from './redux/slices/adminLoginSlice/adminLoginSlice'
import { getAdminUsers } from './redux/slices/adminUsersSlice/adminUsersSlice'

function App() {
	const dispatch = useDispatch()

	const formState = {
		bitrix_id: '225',
		secret_key: 'Смородин Борис Борисович',
		name: null,
		login_type: null,
	}

	const formStateUsers = {
		bitrix_id: '225',
		secret_key: 'Смородин Борис Борисович',
		user_bitrix_id: '225',
		username: null,
	}

	const formStateLogins = {
		bitrix_id: '225',
		secret_key: 'Смородин Борис Борисович',
		login_type: 0,
		users_list: null,
		clients_list: null,
	}

	useEffect(() => {
		dispatch(getAdminClients({ formState }))
		dispatch(getAdminUsers({ formStateUsers }))
		dispatch(getAdminLogins({ formStateLogins }))
	}, [])

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
	return <RouterProvider router={router} />
}

export default App

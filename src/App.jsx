import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'
import ClientsPage from './pages/ClientsPage/ClientsPage'
import EditPage from './pages/EditPage/EditPage'
import LoginCallPage from './pages/LoginCallPage/LoginCallPage'
import LoginCodePage from './pages/LoginCodePage/LoginCodePage'
import LoginPushPage from './pages/LoginPushPage/LoginPushPage'
import LoginSmsPage from './pages/LoginSmsPage/LoginSmsPage'
import UsersPage from './pages/UsersPage/UsersPage'

import {
	getAdminClients,
	getAdminUsers,
} from './redux/slices/adminGetSlice/adminGetReducer'

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

	useEffect(() => {
		dispatch(getAdminClients({ formState }))
		dispatch(getAdminUsers({ formStateUsers }))
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
					path: '/login/sms',
					element: <LoginSmsPage />,
				},
				{
					path: '/login/code',
					element: <LoginCodePage />,
				},
				{
					path: '/login/call',
					element: <LoginCallPage />,
				},
				{
					path: '/login/push',
					element: <LoginPushPage />,
				},
			],
		},
	])
	return <RouterProvider router={router} />
}

export default App

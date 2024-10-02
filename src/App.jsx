import React from 'react'
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

function App() {
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

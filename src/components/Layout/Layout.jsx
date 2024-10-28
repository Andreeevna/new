import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { getAdminClients } from '../../redux/slices/adminGetSlice/adminGetReducer'
import Sidebar from '../Sidebar/Sidebar'
import './Layout.css'

const Layout = ({ children }) => {
	const dispatch = useDispatch()

	const formState = {
		bitrix_id: '225',
		secret_key: 'Смородин Борис Борисович',
		name: null,
		login_type: null,
	}

	useEffect(() => {
		dispatch(getAdminClients({ formState }))
	}, [])
	return (
		<>
			<div id='modals'></div>
			<div className='container-layout'>
				<Sidebar />
				<Outlet />
			</div>
		</>
	)
}

export default Layout

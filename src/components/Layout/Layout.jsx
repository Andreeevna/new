import React from 'react'
import { Outlet } from 'react-router-dom'

import Sidebar from '../Sidebar/Sidebar'
import './Layout.css'

const Layout = ({ children }) => {
	return (
		<>
			<div className='container-layout'>
				<Sidebar />
				<Outlet />
			</div>
		</>
	)
}

export default Layout

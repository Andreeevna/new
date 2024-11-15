import React from 'react'
import { Outlet } from 'react-router-dom'

import Sidebar from '../Sidebar/Sidebar'
import './Layout.css'

const Layout = ({ children }) => {
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

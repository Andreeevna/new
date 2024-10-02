import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import clsx from 'clsx'
import './Sidebar.css'

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleDropdown = () => {
		setIsOpen(!isOpen)
	}
	return (
		<div className='sidebar'>
			<div className='sidebar__wrapper'>
				<div className='sidebar-menu'>
					<ul className='sidebar-list'>
						<NavLink
							to='/'
							className={({ isActive }) =>
								isActive
									? clsx('sidebar-list__link', 'sidebar-list__link-active')
									: 'sidebar-list__link'
							}
						>
							<li className='sidebar-list__item'>
								<HomeOutlinedIcon className='sidebarIcon' />
								Главная
							</li>
						</NavLink>
						<NavLink
							to='/users'
							className={({ isActive }) =>
								isActive
									? clsx('sidebar-list__link', 'sidebar-list__link-active')
									: 'sidebar-list__link'
							}
						>
							<li className='sidebar-list__item'>
								<PeopleOutlineIcon className='sidebarIcon' />
								Пользователи
							</li>
						</NavLink>
						<NavLink
							to='/clients'
							className={({ isActive }) =>
								isActive
									? clsx('sidebar-list__link', 'sidebar-list__link-active')
									: 'sidebar-list__link'
							}
						>
							<li className='sidebar-list__item'>
								<PeopleOutlineIcon className='sidebarIcon' />
								Клиенты
							</li>
						</NavLink>
						<div className='sidebar-list__link'>
							<li
								className='sidebar-list__item'
								onClick={() => toggleDropdown()}
							>
								<LockOpenIcon className='sidebarIcon' />
								Логины
							</li>
						</div>
						{isOpen && (
							<ul className='dropdown-menu'>
								<li className='dropdown-menu__item'>
									<NavLink
										to='/login/sms'
										className={({ isActive }) =>
											isActive
												? clsx(
														'dropdown-menu__link',
														'dropdown-menu__link-active'
												  )
												: 'dropdown-menu__link'
										}
									>
										по sms
									</NavLink>
								</li>
								<li className='dropdown-menu__item'>
									<NavLink
										to='/login/code'
										className={({ isActive }) =>
											isActive
												? clsx(
														'dropdown-menu__link',
														'dropdown-menu__link-active'
												  )
												: 'dropdown-menu__link'
										}
									>
										по коду
									</NavLink>
								</li>
								<li className='dropdown-menu__item'>
									<NavLink
										to='/login/call'
										className={({ isActive }) =>
											isActive
												? clsx(
														'dropdown-menu__link',
														'dropdown-menu__link-active'
												  )
												: 'dropdown-menu__link'
										}
									>
										по звонку
									</NavLink>
								</li>
								<li className='dropdown-menu__item'>
									<NavLink
										to='/login/push'
										className={({ isActive }) =>
											isActive
												? clsx(
														'dropdown-menu__link',
														'dropdown-menu__link-active'
												  )
												: 'dropdown-menu__link'
										}
									>
										по уведомлению
									</NavLink>
								</li>
							</ul>
						)}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Sidebar

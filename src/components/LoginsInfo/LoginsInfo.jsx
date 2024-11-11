import React from 'react'

import './LoginsInfo.css'

const LoginsInfo = ({ title, items }) => {
	console.log(items)
	if (items.length < 1)
		return <div className='logins-info__empty'>Информация не найдена</div>
	const headers = [
		'Клиент',
		'Логин ID',
		'Тип логина',
		'Секретный ключ',
		'Логин',
		'Пароль',
		'Логин на PUSH сервере',
		'Пароль на PUSH сервере',
	]

	const rows = items?.map((item, index) => (
		<tr key={index}>
			<td className='ellipsis'>{item?.client?.name}</td>
			<td className='ellipsis'>{item?.login?.id}</td>
			<td className='ellipsis'>{item?.login.login_type_id}</td>
			<td className='ellipsis'>{item?.login?.secret}</td>
			<td className='ellipsis'>{item?.login?.login}</td>
			<td className='ellipsis'>{item?.login?.password}</td>
			<td className='ellipsis'>{item?.login?.login_two_fa}</td>
			<td className='ellipsis'>{item?.login?.password_two_fa}</td>
		</tr>
	))

	return (
		<div>
			<h1 className='logins-info__title'>
				{title}{' '}
				<span className='logins-info__user'>
					{items ? items[0].user.username : null}
				</span>
			</h1>
			<table className='styled-table'>
				<thead>
					<tr>
						{headers?.map((header, index) => (
							<th key={index}>{header}</th>
						))}
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>{' '}
		</div>
	)
}

export default LoginsInfo

import React, { useMemo, useState } from 'react'

import { DeleteOutline } from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'

import { CustomPagination } from '../../components/CustomPagination/CustomPagination'

import { rowsPushLogins } from '../../utils/utils'

import usePopup from '../../hooks/usePopup'

import './LoginPushPage.css'

const filterNames = {
	id: 'Поиск по ID',
	user_id: 'Поиск по ID пользователя',
	client_id: 'Поиск по ID клиента',
	login: 'Поиск по логину',
	creation_date: 'Поиск по дате создания',
	last_used: 'Поиск по дате использования',
}

const LoginPushPage = () => {
	const [rows, setRows] = useState(rowsPushLogins)
	const [filterValues, setFilterValues] = useState({})

	const { showPopup, parameter, renderPopUp, togglePopup } = usePopup()

	const handleDelete = (e, id) => {
		e.stopPropagation()
		setRows(rows.filter(item => item.id !== id))
		console.log(id)
	}

	const columnsPushLogins = [
		{
			field: `id`,
			headerName: `ID`,
			width: 70,
			sortable: true,
			editable: false,
			hideable: false,
		},
		{
			field: `user_id`,
			headerName: `ID пользователя`,
			sortable: false,
			editable: false,
			hideable: false,
		},
		{
			field: `client_id`,
			headerName: `ID клиента`,
			sortable: true,
			editable: false,
			hideable: false,
		},
		{
			field: `login`,
			headerName: `Логин`,
			width: 70,
			sortable: true,
			editable: false,
			hideable: false,
		},
		{
			field: `password`,
			headerName: `Пароль`,
			width: 70,
			sortable: false,
			editable: false,
			hideable: false,
		},
		{ field: `login_two_fa`, headerName: `Клиентский логин` },
		{ field: `password_two_fa`, headerName: `Клиентский пароль` },
		{ field: `instruction`, headerName: `Инструкция` },
		{ field: `creation_date`, headerName: `Дата создания` },
		{ field: `last_used`, headerName: `Дата последнего использования` },
		{
			field: `FOREIGN_KEY_user_id`,
			headerName: `Внешний ключ ID пользователя`,
		},
		{ field: `FOREIGN_KEY_client_id`, headerName: `Внешний ключ ID клиента` },
		{
			field: 'action',
			headerName: 'Действия',
			width: 130,
			sortable: false,
			editable: false,
			hideable: false,
			renderCell: params => {
				return (
					<div className='action-group'>
						<div className=''>
							<button
								className='productListEdit'
								onClick={e => {
									togglePopup(e, params.row.id, 'loginpush')
								}}
							>
								Изменить
							</button>
							{params.row.id === parameter && showPopup
								? renderPopUp(null, params.row.id, 'loginpush')
								: null}
						</div>
						<DeleteOutline
							className='productListDelete'
							onClick={e => handleDelete(e, params.row.id)}
						/>
					</div>
				)
			},
		},
	]

	function onUpdateFilteredValue(key, value) {
		filterValues[key] = value.trim().toLowerCase()

		setFilterValues({ ...filterValues })
	}

	const filters = useMemo(() => {
		if (!rows.length) {
			return []
		}

		const keys = Object.keys(rows[0])

		return keys
			.filter(key => filterNames[key])
			.map(key => {
				return (
					<div className='search-item' key={key}>
						<input
							className='search__input'
							type='text'
							placeholder={filterNames[key]}
							onChange={event => onUpdateFilteredValue(key, event.target.value)}
						/>
					</div>
				)
			})
	}, [rows[0]])

	const filteredRows = useMemo(() => {
		return rows?.filter(row => {
			return Object.entries(row).every(([key, value]) => {
				if (!filterValues[key]) {
					return true
				}
				return value?.toString()?.toLowerCase()?.includes(filterValues[key])
			})
		})
	}, [filterValues, rows])

	// PAGINATION
	const PAGE_SIZE = 5

	const [paginationModel, setPaginationModel] = React.useState({
		pageSize: PAGE_SIZE,
		page: 0,
	})
	return (
		<div className='login'>
			<div className='table__container'>
				<div className='search__container'>{filters}</div>

				<div className='login-list'>
					<DataGrid
						columns={columnsPushLogins}
						rows={filteredRows}
						paginationModel={paginationModel}
						onPaginationModelChange={setPaginationModel}
						pageSizeOptions={[PAGE_SIZE]}
						slots={{
							pagination: CustomPagination,
						}}
						checkboxSelection
						disableColumnMenu
						onRowSelectionModelChange={ids => {
							const selectedIDs = new Set(ids)
							const selectedRowData = rows.filter(row =>
								selectedIDs.has(row.id)
							)
							// console.log(selectedRowData)
						}}
					/>
				</div>
			</div>
		</div>
	)
}

export default LoginPushPage

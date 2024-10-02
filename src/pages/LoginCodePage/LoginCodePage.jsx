import React, { useMemo, useState } from 'react'

import { DeleteOutline } from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'

import { CustomPagination } from '../../components/CustomPagination/CustomPagination'

import { Link } from 'react-router-dom'
import { rowsCodeLogins } from '../../utils/utils'
import './LoginCodePage.css'

const filterNames = {
	id: 'Поиск по ID',
	user_id: 'Поиск по ID пользователя',
	client_id: 'Поиск по ID клиента',
	login: 'Поиск по логину',
	creation_date: 'Поиск по дате создания',
	last_used: 'Поиск по дате использования',
}

const LoginCodePage = () => {
	const [rows, setRows] = useState(rowsCodeLogins)

	const handleDelete = (e, id) => {
		e.stopPropagation()
		setRows(rows.filter(item => item.id !== id))
		console.log(id)
	}
	const columnsCodeLogins = [
		{ field: `id`, headerName: `ID`, width: 60 },
		{ field: `user_id`, headerName: `ID пользователя` },
		{ field: `client_id`, headerName: `ID клиента` },
		{ field: `secret`, headerName: `Внутренний ключ` },
		{ field: `login`, headerName: `Логин`, width: 70 },
		{ field: `password`, headerName: `Пароль` },
		{ field: `instruction`, headerName: `Инструкция` },
		{
			field: `creation_date`,
			headerName: `Дата создания`,
			sortable: true,
			editable: false,
			hideable: false,
		},
		{
			field: `last_used`,
			headerName: `Дата последнего использования`,
			sortable: true,
			editable: false,
			hideable: false,
		},
		{
			field: `FOREIGN_KEY_user_id`,
			headerName: `Внешний ключ ID пользователя`,
			sortable: false,
			editable: false,
			hideable: false,
		},
		{
			field: `FOREIGN_KEY_client_id`,
			headerName: `Внешний ключ ID клиента`,
			sortable: false,
			editable: false,
			hideable: false,
		},
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
						<Link to={`/edit/${params.row.id}/loginsms`}>
							<button className='productListEdit'>Изменить</button>
						</Link>
						<DeleteOutline
							className='productListDelete'
							onClick={e => handleDelete(e, params.row.id)}
						/>
					</div>
				)
			},
		},
	]

	const [filterValues, setFilterValues] = useState({})
	console.log(filterValues)

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
			return Object.entries(row).map(([key, value]) => {
				if (!filterValues) {
					return true
				}

				return value?.toString().toLowerCase()?.includes(filterValues[key])
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
			<div className='login__container'>
				<div className='search__container'>{filters}</div>

				<div className='login-list'>
					<DataGrid
						columns={columnsCodeLogins}
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

export default LoginCodePage

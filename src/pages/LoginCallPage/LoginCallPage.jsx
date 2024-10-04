import React, { useMemo, useState } from 'react'

import { DeleteOutline } from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'

import { CustomPagination } from '../../components/CustomPagination/CustomPagination'

import { rowsCallLogins } from '../../utils/utils'

import usePopup from '../../hooks/usePopup'
import './LoginCallPage.css'

const filterNames = {
	id: 'Поиск по ID',
	user_id: 'Поиск по ID пользователя',
	client_id: 'Поиск по ID клиента',
	login: 'Поиск по логину',
	creation_date: 'Поиск по дате создания',
	last_used: 'Поиск по дате использования',
}

const LoginCallPage = () => {
	const [rows, setRows] = useState(rowsCallLogins)
	const [filterValues, setFilterValues] = useState({})

	const { showPopup, parameter, renderPopUp, togglePopup } = usePopup()

	const handleDelete = (e, id) => {
		e.stopPropagation()
		setRows(rows.filter(item => item.id !== id))
		console.log(id)
	}

	const columnCallLogins = [
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
			width: 140,
			sortable: true,
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
			sortable: true,
			editable: false,
			hideable: false,
		},
		{
			field: `password`,
			headerName: `Пароль`,
			sortable: false,
			editable: false,
			hideable: false,
		},
		{
			field: `instruction`,
			headerName: `Инструкция`,
			sortable: false,
			editable: false,
			hideable: false,
		},
		{
			field: `creation_date`,
			headerName: `Дата создания`,
			width: 120,
			sortable: true,
			editable: false,
			hideable: false,
		},
		{
			field: `last_used`,
			headerName: `Дата последнего использования`,
			width: 120,
			sortable: true,
			editable: false,
			hideable: false,
		},
		{
			field: `FOREIGN_KEY_user_id`,
			headerName: `Внешний ключ ID пользователя`,
			width: 130,
			sortable: false,
			editable: false,
			hideable: false,
		},
		{
			field: `FOREIGN_KEY_client_id`,
			headerName: `Внешний ключ ID клиента`,
			width: 130,
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
						<div className=''>
							<button
								className='productListEdit'
								onClick={e => {
									togglePopup(e, params.row.id, 'logincall')
								}}
							>
								Изменить
							</button>
							{params.row.id === parameter && showPopup
								? renderPopUp(null, params.row.id, 'logincall')
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
						columns={columnCallLogins}
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

export default LoginCallPage

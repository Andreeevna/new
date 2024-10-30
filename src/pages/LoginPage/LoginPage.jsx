import React, { useMemo, useState } from 'react'

import { DataGrid } from '@mui/x-data-grid'

import { CustomPagination } from '../../components/CustomPagination/CustomPagination'

import usePopup from '../../hooks/usePopup'

import { useSelector } from 'react-redux'
import './LoginPage.css'

const filterNames = {
	id: 'Поиск по ID',
	user_id: 'Поиск по ID пользователя',
	client_id: 'Поиск по ID клиента',
	login: 'Поиск по логину',
	creation_date: 'Поиск по дате создания',
	last_used: 'Поиск по дате использования',
}
const LoginPage = () => {
	const loginRow = useSelector(state => state.logins.logins)
	const rows = []
	const new12 = loginRow?.map(item => {
		return Object.entries(item).filter(([key, value]) => {
			if (key === 'login') {
				rows.push(value)
			}
		})
	})
	console.log(rows)

	// const [rows, setRows] = useState(rowsSmsLogins)
	const [filterValues, setFilterValues] = useState({})
	console.log(filterValues)

	const { showPopup, parameter, renderPopUp, togglePopup } = usePopup()

	const handleDelete = (e, id) => {
		e.stopPropagation()
		// setRows(rows.filter(item => item.id !== id))
		// console.log(id)
	}

	const columnsLogins = [
		{
			field: `id`,
			headerName: `ID`,
			width: 70,
			sortable: true,
			editable: false,
			hideable: false,
		},

		{
			field: `login_type_id`,
			headerName: `Тип логина`,
			width: 140,
			sortable: true,
			editable: false,
			hideable: false,
		},
		{
			field: `secret`,
			headerName: `Секретный ключ`,
			sortable: true,
			editable: false,
			hideable: false,
		},
		{
			field: `login`,
			headerName: `Логин`,
			// width: 100,
			sortable: true,
			editable: false,
			hideable: false,
		},
		{
			field: `password`,
			headerName: `Пароль`,
			// width: 100,
			sortable: true,
			editable: false,
			hideable: false,
		},
		{
			field: `login_two_fa`,
			headerName: `Клиентский логин`,
			sortable: false,
			editable: false,
			hideable: false,
		},
		{
			field: `password_two_fa`,
			headerName: `Клиентский пароль`,
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
			renderCell: params => {
				console.log(params)
			},
		},
		{
			field: 'action',
			headerName: 'Действия',
			width: 130,
			sortable: false,
			editable: false,
			hideable: false,
			renderCell: params => {
				// console.log(params)
				return (
					<div className='action-group'>
						<div className=''>
							<button
								className='productListEdit'
								onClick={e => {
									togglePopup(e, params.row.id, 'loginsms')
								}}
							>
								Изменить
							</button>
							{params.row.id === parameter && showPopup
								? renderPopUp(null, params.row.id, 'loginsms')
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
		if (!loginRow.length) {
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
						columns={columnsLogins}
						rows={filteredRows}
						// columnVisibilityModel={{
						// 	id: false,
						// }}
						paginationModel={paginationModel}
						onPaginationModelChange={setPaginationModel}
						pageSizeOptions={[PAGE_SIZE]}
						slots={{
							pagination: CustomPagination,
						}}
						checkboxSelection
						disableColumnMenu
						// disableColumnSelector
						// disableDensitySelector
						// disableSelectionOnClick
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

export default LoginPage

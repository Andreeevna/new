/* eslint-disable */

import { DeleteOutline } from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'
import * as React from 'react'

import { useMemo, useState } from 'react'
import { rows_users } from '../../utils/utils'
// import { CustomPagination } from './Pagination'
import { CustomPagination } from '../../components/CustomPagination/CustomPagination'
import usePopup from '../../hooks/usePopup'
import './UsersPage.css'

const filterNames = {
	id: 'Поиск по ID',
	bitrix_id: 'Поиск bitrix_id',
	username: 'Поиск по имени пользователя',
	creation_date: 'Поиск по дате',
}

export default function UsersPage() {
	const [rows, setRows] = useState(rows_users)
	const { showPopup, parameter, renderPopUp, togglePopup } = usePopup()

	const handleDelete = (e, id) => {
		e.stopPropagation()
		setRows(rows.filter(item => item.id !== id))
	}

	const columns = [
		{
			field: `id`,
			headerName: `ID`,
			width: 100,
			sortable: true,
			editable: false,
			filterable: false,
			hideable: false,
		},
		{
			field: `bitrix_id`,
			headerName: `bitrix_ID`,
			width: 130,
			editable: false,
			filterable: false,
			hideable: false,
		},
		{
			field: `username`,
			headerName: `Имя пользователя`,
			width: 180,
			editable: false,
			filterable: false,
			hideable: false,
		},
		{
			field: `creation_date`,
			headerName: `Дата создания`,
			width: 200,
			editable: false,
			filterable: false,
			hideable: false,
		},
		{
			field: 'action',
			headerName: 'Действия',
			width: 150,
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
									togglePopup(e, params.row.id, 'users')
								}}
							>
								Изменить
							</button>

							{params.row.id === parameter && showPopup
								? renderPopUp(null, params.row.id, 'users')
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

	const [filterValues, setFilterValues] = useState({})

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
		<div className='users'>
			<div className='table__container'>
				<div className='search__container'>{filters}</div>

				<div className='users-list'>
					<DataGrid
						columns={columns}
						rows={filteredRows}
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

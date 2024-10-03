import React, { useMemo, useState } from 'react'

import { DeleteOutline } from '@mui/icons-material'

import { DataGrid } from '@mui/x-data-grid'
import { CustomPagination } from '../../components/CustomPagination/CustomPagination'
import PopUp from '../../components/PopUp/PopUp'
import { rowsClients } from '../../utils/utils'

import './ClientsPage.css'

const filterNames = {
	name: 'Поиск по имени клиента',
	creation_date: 'Поиск по дате',
}

const ClientsPage = () => {
	const [rows, setRows] = useState(rowsClients)
	const [filterValues, setFilterValues] = useState({})

	const [showPopup, setShowPopup] = useState(false)
	const [par, setPar] = useState(null)

	const renderPopUp = (e = null, id = null, chapter = '') => {
		if (e) e.stopPropagation()

		if (id && chapter) {
			return (
				<PopUp id={id} chapter={chapter} onClose={() => setShowPopup(false)} />
			)
		}
	}

	const columnsClients = [
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
			field: `name`,
			headerName: `Имя клиента`,
			width: 150,
			sortable: true,
			editable: false,
			filterable: false,
			hideable: false,
		},
		{
			field: `max_accounts`,
			headerName: `Максимальное количество аккаунтов`,
			width: 300,
			sortable: false,
			editable: false,
			filterable: false,
			hideable: false,
		},
		{
			field: `creation_date`,
			headerName: `Дата создания`,
			width: 200,
			sortable: true,
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
									setShowPopup(true)
									renderPopUp(e, params.row.id, 'clients')
									setPar(params.row.id)
								}}
							>
								Изменить
							</button>
							{params.row.id === par && showPopup
								? renderPopUp(null, params.row.id, 'clients')
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

	const handleDelete = (e, id) => {
		e.stopPropagation()
		setRows(rows.filter(item => item.id !== id))
		console.log(id)
	}

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
		<div className='clients'>
			<div className='table__container'>
				<div className='search__container'>{filters}</div>

				<div className='clients-list'>
					<DataGrid
						columns={columnsClients}
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

export default ClientsPage

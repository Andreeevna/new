import React, { useMemo, useState } from 'react'

import { DeleteOutline } from '@mui/icons-material'

import { DataGrid } from '@mui/x-data-grid'
import { CustomPagination } from '../../components/CustomPagination/CustomPagination'

import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Button/Button'
import CreateItem from '../../components/CreateItem/CreateItem'
import PopUp from '../../components/PopUp/PopUp'
import usePopup from '../../hooks/usePopup'
import {
	deleteAdminClients,
	deleteLocalClient,
} from '../../redux/slices/adminGetSlice/adminGetReducer'
import './ClientsPage.css'

const filterNames = {
	name: 'Поиск по имени клиента',
	creation_date: 'Поиск по дате',
}

const ClientsPage = () => {
	const dispatch = useDispatch()

	const clientRow = useSelector(state => state.incom.clients)

	const [filterValues, setFilterValues] = useState({})

	const { showPopup, parameter, renderPopUp, togglePopup } = usePopup()

	const [showCreatePopup, setShowCreatePopup] = useState(false)

	const dayInMonthComparator = (v1, v2) => {
		// console.log(v1, v2)
		const newDa = formatDateForSorting(v1)
		const newVa = formatDateForSorting(v2)
		const n = newDa.getTime()
		const l = newVa.getTime()

		return n - l
	}

	function formatDateForSorting(inputDate) {
		const [day] = inputDate.split('.')[0].split('-')
		const [month] = inputDate.split('.')[1].split('-')
		const [year] = inputDate.split('.')[2].split(' ')

		const [hours, minutes] = inputDate.split(' ').pop().split(':')
		console.log(day, month, year)

		console.log(hours, minutes)

		const dateObject = new Date(year, month, day, hours, minutes)

		return dateObject
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
			// width: 150,
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
			width: 170,
			sortable: true,
			editable: false,
			filterable: false,
			hideable: false,
			sortComparator: dayInMonthComparator,
			renderCell: params => {
				// return moment(params.row.creation_date).format('DD.MM.YYYY HH:mm')
				return params.row.creation_date
			},
		},
		{
			field: `instruction`,
			headerName: `Инструкция`,
			// width: 300,
			sortable: false,
			editable: false,
			filterable: false,
			hideable: false,
		},
		{
			field: `login_type_id`,
			headerName: `Тип логина`,
			// width: 300,
			sortable: false,
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
									togglePopup(e, params.row.id, 'clients')
								}}
							>
								Изменить
							</button>
							{params.row.id === parameter && showPopup
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

	const renderCreatePopUp = () => {
		return (
			<PopUp onClose={() => setShowCreatePopup(false)}>
				<CreateItem columns={columnsClients} />
			</PopUp>
		)
	}

	const getCreatePopUp = () => {
		setShowCreatePopup(true)
		renderCreatePopUp()
	}

	const handleDelete = (e, id) => {
		e.stopPropagation()
		console.log(id)
		const formStateClient = {
			bitrix_id: '225',
			secret_key: 'Смородин Борис Борисович',
			delete_id: id,
		}

		dispatch(deleteLocalClient(id))
		dispatch(deleteAdminClients({ formStateClient }))
	}

	function onUpdateFilteredValue(key, value) {
		filterValues[key] = value.trim().toLowerCase()

		setFilterValues({ ...filterValues })
	}

	const filters = useMemo(() => {
		if (!clientRow.length) {
			return []
		}

		const keys = Object.keys(clientRow[0])

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
	}, [clientRow[0]])

	const filteredRows = useMemo(() => {
		return clientRow?.filter(row => {
			return Object.entries(row).every(([key, value]) => {
				if (!filterValues[key]) {
					return true
				}

				return value?.toString()?.toLowerCase()?.includes(filterValues[key])
			})
		})
	}, [filterValues, clientRow])

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
				<div className='clients__button-send'>
					<Button
						className={'button-send__end'}
						text='Создать'
						onClick={getCreatePopUp}
					/>
				</div>

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
							const selectedRowData = clientRow.filter(row =>
								selectedIDs.has(row.id)
							)
							// console.log(selectedRowData)
						}}
					/>
				</div>
			</div>
			{showCreatePopup && renderCreatePopUp()}
		</div>
	)
}

export default ClientsPage

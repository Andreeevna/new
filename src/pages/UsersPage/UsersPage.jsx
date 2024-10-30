/* eslint-disable */

import { DeleteOutline } from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'
import * as React from 'react'

import { useMemo, useState } from 'react'
// import { CustomPagination } from './Pagination'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Button/Button'
import CreateItem from '../../components/CreateItem/CreateItem'
import { CustomPagination } from '../../components/CustomPagination/CustomPagination'
import PopUp from '../../components/PopUp/PopUp'
import usePopup from '../../hooks/usePopup'
import {
	createAdminUser,
	deleteAdminUser,
} from '../../redux/slices/adminUsersSlice/adminUsersSlice'
import './UsersPage.css'

const filterNames = {
	id: 'Поиск по ID',
	bitrix_id: 'Поиск bitrix_id',
	username: 'Поиск по имени пользователя',
	creation_date: 'Поиск по дате',
}

export default function UsersPage() {
	const { showPopup, parameter, renderPopUp, togglePopup } = usePopup()

	const [showCreatePopup, setShowCreatePopup] = useState(false)

	const dispatch = useDispatch()

	const userRows = useSelector(state => state.users.users)

	const handleDelete = (e, id) => {
		e.stopPropagation()
		const formStateUser = {
			bitrix_id: '225',
			secret_key: 'Смородин Борис Борисович',
			delete_id: id,
		}
		dispatch(deleteAdminUser({ formStateUser }))
	}

	const dayInMonthComparator = (v1, v2) => {
		const n = new Date(v1).getTime()
		const l = new Date(v2).getTime()

		return n - l
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
			sortComparator: dayInMonthComparator,
			// renderCell: params => {
			// 	console.log(params)
			// 	return moment(params.row.creation_date).format('DD.MM.YYYY HH:mm')
			// },
		},
		{
			field: 'action',
			headerName: 'Действия',
			width: 150,
			sortable: false,
			editable: true,
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

	const onItemCreated = React.useCallback(formState => {
		const formStateCreate = {
			bitrix_id: 225,
			secret_key: 'Смородин Борис Борисович',
			user_bitrix_id: formState.bitrix_id,
			username: formState.username,
		}

		dispatch(createAdminUser({ formStateCreate }))
	}, [])

	const renderCreatePopUp = () => {
		return (
			<PopUp onClose={() => setShowCreatePopup(false)}>
				<CreateItem
					columns={columns}
					IGNORED_FIELD={['id', 'creation_date', 'action']}
					onItemCreated={onItemCreated}
				/>
			</PopUp>
		)
	}

	const getCreatePopUp = () => {
		setShowCreatePopup(true)
		renderCreatePopUp()
	}

	const [filterValues, setFilterValues] = useState({})

	function onUpdateFilteredValue(key, value) {
		filterValues[key] = value.trim().toLowerCase()

		setFilterValues({ ...filterValues })
	}

	const filters = useMemo(() => {
		if (!userRows.length) {
			return []
		}

		const keys = Object.keys(userRows[0])

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
	}, [userRows[0]])

	const filteredRows = useMemo(() => {
		return userRows?.filter(row => {
			return Object.entries(row).every(([key, value]) => {
				if (!filterValues[key]) {
					return true
				}
				return value?.toString()?.toLowerCase()?.includes(filterValues[key])
			})
		})
	}, [filterValues, userRows])

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
				<div className='clients__button-send'>
					<Button
						className={'button-send__end'}
						text='Создать'
						onClick={getCreatePopUp}
					/>
				</div>

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
							const selectedRowData = userRows.filter(row =>
								selectedIDs.has(row.id)
							)
							console.log(selectedRowData)
						}}
					/>
				</div>
			</div>
			{showCreatePopup && renderCreatePopUp()}
		</div>
	)
}

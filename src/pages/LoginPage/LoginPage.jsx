import React, { useMemo, useState } from 'react'

import { DataGrid } from '@mui/x-data-grid'

import { CustomPagination } from '../../components/CustomPagination/CustomPagination'

import usePopup from '../../hooks/usePopup'

import { DeleteOutline } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Button/Button'
import CreateItem from '../../components/CreateItem/CreateItem'
import PopUp from '../../components/PopUp/PopUp'
import {
	createAdminLogin,
	deteleAdminLogin,
	deteleAdminLogins,
} from '../../redux/slices/adminLoginSlice/adminLoginSlice'
import './LoginPage.css'

const filterNames = {
	id: 'Поиск по ID',
	login: 'Поиск по логину',
	creation_date: 'Поиск по дате создания',
	last_used: 'Поиск по дате использования',
}
const LoginPage = () => {
	const [filterValues, setFilterValues] = useState({})

	const dispatch = useDispatch()

	const { showPopup, parameter, renderPopUp, togglePopup } = usePopup()

	const [showCreatePopup, setShowCreatePopup] = useState(false)

	const loginRow = useSelector(state => state.logins.logins)

	const rows = useMemo(() => {
		return loginRow?.map((item, index) => {
			return { ...item.login, index }
		})
	}, [loginRow])

	const handleDelete = (e, id) => {
		const formStateDeleteLogin = {
			bitrix_id: 225,
			secret_key: 'Смородин Борис Борисович',
			delete_id: id,
		}
		e.stopPropagation()
		console.log(id)
		dispatch(deteleAdminLogin({ formStateDeleteLogin }))
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
									togglePopup(e, params.row.id, 'login')
								}}
							>
								Изменить
							</button>
							{params.row.id === parameter && showPopup
								? renderPopUp(null, params.row.id, 'login')
								: null}
						</div>
						<DeleteOutline
							className='productListDelete'
							onClick={e => {
								handleDelete(e, params.row.id)
								// console.log(loginRow[params.row.index])
							}}
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

	const onItemCreated = React.useCallback(formState => {
		const formStateCreateLogin = {
			bitrix_id: 225,
			secret_key: 'Смородин Борис Борисович',
			login: formState.login,
			password: formState.password,
			login_2fa: formState.login_two_fa,
			password_2fa: formState.password_two_fa,
			secret: formState.secret,
			client_id: +formState.client_id,
			user_id: +formState.user_id,
		}

		dispatch(createAdminLogin({ formStateCreateLogin }))
	}, [])

	const renderCreatePopUp = () => {
		return (
			<PopUp onClose={() => setShowCreatePopup(false)}>
				<CreateItem
					columns={[
						...columnsLogins,
						{ field: 'client_id', headerName: 'Id Клиента' },
						{ field: 'user_id', headerName: 'Id Пользователя' },
					]}
					IGNORED_FIELD={[
						'id',
						`login_type_id`,
						'creation_date',
						`last_used`,
						'action',
					]}
					onItemCreated={onItemCreated}
				/>
			</PopUp>
		)
	}

	const getCreatePopUp = () => {
		setShowCreatePopup(true)
		renderCreatePopUp()
	}

	// PAGINATION
	const PAGE_SIZE = 5

	const [paginationModel, setPaginationModel] = React.useState({
		pageSize: PAGE_SIZE,
		page: 0,
	})

	const [sizeSelectesRows, setSizeSelectesRows] = useState([])
	console.log(sizeSelectesRows)

	const getIdsSelectedRows = selectedRowData => {
		return selectedRowData.map(item => {
			return item.id
		})
	}

	const onDeletedLogins = () => {
		const formStateDeleteLogins = {
			bitrix_id: 225,
			secret_key: 'Смородин Борис Борисович',
			delete_ids: sizeSelectesRows,
		}
		dispatch(deteleAdminLogins({ formStateDeleteLogins }))
	}

	return (
		<div className='login'>
			<div className='table__container'>
				<div className='search__container'>{filters}</div>
				<div className='clients__button-send'>
					<Button
						className={'button-send__end'}
						text='Создать'
						onClick={getCreatePopUp}
					/>
					{sizeSelectesRows.length > 0 ? (
						<Button
							className={'button-send__end'}
							text='Удалить элементы'
							onClick={onDeletedLogins}
						/>
					) : null}
				</div>

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
							const idsSelected = getIdsSelectedRows(selectedRowData)
							setSizeSelectesRows(idsSelected)
						}}
					/>
				</div>
			</div>
			{showCreatePopup && renderCreatePopUp()}
		</div>
	)
}

export default LoginPage

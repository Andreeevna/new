import React, { useMemo, useState } from 'react'

import { DataGrid } from '@mui/x-data-grid'

import { CustomPagination } from '../../components/CustomPagination/CustomPagination'

import usePopup from '../../hooks/usePopup'

import { DeleteOutline } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Button/Button'
import CreateItem from '../../components/CreateItem/CreateItem'
import Loader from '../../components/Loader/Loader'
import PopUp from '../../components/PopUp/PopUp'
import WarningDelete from '../../components/WarningDelete/WarningDelete'
import {
	createAdminLogin,
	deteleAdminLogins,
} from '../../redux/slices/adminLoginSlice/adminLoginSlice'
import { getUserInitials } from '../../utils/bx/bxEmploee'
import { loginTypeDict } from '../../utils/dicts'
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

	const { showPopup, parameter, renderPopUp, togglePopup } = usePopup(false, [
		`login.login_type_id`,
		'login.creation_date',
		'login.last_used',
		'clientID',
	])

	const [showCreatePopup, setShowCreatePopup] = useState(false)
	const [showWarningPopup, setShowWarningPopup] = useState(false)
	const [showWarningPopupAll, setShowWarningPopupAll] = useState(false)

	const [parametersRow, setParametersRow] = useState({})
	// console.log(parametersRow)

	const loginRow = useSelector(state => state.logins.logins)
	const isFetching = useSelector(state => state.logins.isFetching)

	const rows = useMemo(() => {
		return loginRow?.map((item, index) => {
			return {
				...item.login,
				index,
				client: item.client.id,
				user: item.user.id,
				clientName: item.client.name,
				login_type: item.login_type.login_type,
			}
		})
	}, [loginRow])

	const columnsLogins = [
		{
			field: `id`,
			headerName: `ID`,
			width: 70,
			// flex: 1,
			sortable: true,
			editable: false,
			hideable: false,
		},
		{
			field: `client`,
			headerName: `ID Клиента`,
			// width: 0,
			// flex: 1,
			sortable: true,
			editable: false,
			hideable: false,
		},
		{
			field: `user`,
			headerName: `ID Пользователя`,
			// width: 0,
			// flex: 1,
			sortable: true,
			editable: false,
			hideable: false,
		},
		{
			field: `login_type`,
			headerName: `Тип логина`,
			// width: 140,
			flex: 1,
			sortable: true,
			editable: false,
			hideable: false,
			renderCell: params => {
				return <span>{loginTypeDict[params.row.login_type]}</span>
			},
		},
		{
			field: `secret`,
			headerName: `Секретный ключ`,
			flex: 1,
			sortable: true,
			editable: false,
			hideable: false,
		},
		{
			field: `login`,
			headerName: `Логин`,
			flex: 1,
			// width: 100,
			sortable: true,
			editable: false,
			hideable: false,
		},
		{
			field: `password`,
			headerName: `Пароль`,
			flex: 1,
			// width: 100,
			sortable: true,
			editable: false,
			hideable: false,
		},
		{
			field: `login_two_fa`,
			headerName: `Логин на PUSH сервере`,
			flex: 1,
			sortable: false,
			editable: false,
			hideable: false,
		},
		{
			field: `password_two_fa`,
			headerName: `Пароль на PUSH сервере`,
			flex: 1,
			sortable: false,
			editable: false,
			hideable: false,
		},
		{
			field: `creation_date`,
			headerName: `Дата создания`,
			flex: 1,
			// width: 120,
			sortable: true,
			editable: false,
			hideable: false,
		},
		{
			field: `last_used`,
			headerName: `Дата последнего использования`,
			flex: 1,
			// width: 120,
			sortable: true,
			editable: false,
			hideable: false,
		},
		{
			field: 'action',
			headerName: 'Действия',
			flex: 1,
			// width: 200,
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
								onHandleWarning()

								setParametersRow(prevState => ({
									...prevState,
									e,
									params: {
										...prevState.params,
										row: {
											...prevState.row,
											id: params.id,
										},
									},
								}))
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

	const userID = useSelector(state => state.bx.userId)
	const initials = useSelector(state => state.bx.initials)

	const secretKey = getUserInitials(
		initials.NAME,
		initials.LAST_NAME,
		initials.SECOND_NAME
	)

	const onItemCreated = React.useCallback(
		formState => {
			const formStateCreateLogin = {
				bitrix_id: +userID,
				secret_key: `${secretKey}`,
				login: formState.login,
				password: formState.password,
				login_2fa: formState.login_two_fa,
				password_2fa: formState.password_two_fa,
				secret: formState.secret,
				client_id: +formState.client,
				user_id: +formState.user,
			}

			dispatch(createAdminLogin({ formStateCreateLogin }))
		},
		[secretKey]
	)

	const renderCreatePopUp = () => {
		return (
			<PopUp onClose={() => setShowCreatePopup(false)}>
				<CreateItem
					columns={[
						...columnsLogins,
						// { field: 'client_id', headerName: 'Id Клиента' },
						// { field: 'user_id', headerName: 'Id Пользователя' },
					]}
					IGNORED_FIELD={[
						'id',
						`login_type`,
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

	// LOGINS DELETE

	const [sizeSelectesRows, setSizeSelectesRows] = useState([])
	// console.log(sizeSelectesRows)

	const getIdsSelectedRows = selectedRowData => {
		return selectedRowData.map(item => {
			return item.id
		})
	}

	// WARNING DELETE
	const handleDelete = (e, ids) => {
		if (e) e.stopPropagation()

		const formStateDeleteLogins = {
			bitrix_id: +userID,
			secret_key: `${secretKey}`,
			delete_ids: ids,
		}
		dispatch(deteleAdminLogins({ formStateDeleteLogins })).then(resp => {
			if (resp.payload.message === 'Deleted') {
				setSizeSelectesRows([])
			}
		})
	}

	const warningPopup = ({
		handleDelete,
		title,
		ids,
		e,
		setShowWarningPopup,
		setParametersRow,
	}) => {
		return (
			<PopUp
				onClose={() => {
					setShowWarningPopup(false)
					setSizeSelectesRows([])
				}}
			>
				<WarningDelete
					title={title}
					confirmText={'Удалить'}
					cancelText={'Отменить'}
					onConfirm={handleDelete}
					onCancel={setShowWarningPopup}
					ids={ids}
					setParametersRow={setParametersRow}
					e={e}
				/>
			</PopUp>
		)
	}

	const onHandleWarning = () => {
		setShowWarningPopup(true)
	}

	return (
		<>
			{isFetching ? (
				<Loader />
			) : (
				<div className='login'>
					<div className='table__container'>
						<div className='search__container'>{filters}</div>
						<div className='clients__button-send'>
							<Button
								className={'button-send__end'}
								text='Создать'
								onClick={getCreatePopUp}
							/>
							{sizeSelectesRows.length > 1 ? (
								<Button
									className={'button-send__end'}
									text='Удалить элементы'
									onClick={() => setShowWarningPopupAll(true)}
								/>
							) : null}
						</div>

						<div className='login-list'>
							<DataGrid
								columns={columnsLogins}
								rows={filteredRows}
								paginationModel={paginationModel}
								onPaginationModelChange={setPaginationModel}
								pageSizeOptions={[PAGE_SIZE]}
								slots={{
									pagination: CustomPagination,
								}}
								checkboxSelection
								disableColumnMenu
								rowSelectionModel={sizeSelectesRows}
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
					{showWarningPopup &&
						warningPopup({
							handleDelete,
							title: 'Вы действительно хотите удалить элемент?',
							ids: [parametersRow.params.row.id],
							e: parametersRow.e,
							setShowWarningPopup: setShowWarningPopup,
							setParametersRow: () => setParametersRow({}),
						})}

					{showWarningPopupAll &&
						warningPopup({
							handleDelete,
							title: 'Вы действительно хотите удалить элементы?',
							ids: sizeSelectesRows,
							setShowWarningPopup: setShowWarningPopupAll,
							setParametersRow: () => setSizeSelectesRows([]),
						})}
				</div>
			)}
		</>
	)
}

export default LoginPage

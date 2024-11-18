import React, { useMemo, useState } from 'react'

import { DeleteOutline } from '@mui/icons-material'

import { DataGrid } from '@mui/x-data-grid'
import { CustomPagination } from '../../components/CustomPagination/CustomPagination'

import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Button/Button'
import CreateItem from '../../components/CreateItem/CreateItem'
import Loader from '../../components/Loader/Loader'
import LoginsInfo from '../../components/LoginsInfo/LoginsInfo'
import PopUp from '../../components/PopUp/PopUp'
import WarningDelete from '../../components/WarningDelete/WarningDelete'
import usePopup from '../../hooks/usePopup'
import {
	createAdminClient,
	deleteAdminClients,
} from '../../redux/slices/adminClientsSlice/adminClientsSlice'
import { getAdminLogin } from '../../redux/slices/adminUsersSlice/adminUsersSlice'
import { getUserInitials } from '../../utils/bx/bxEmploee'
import { loginTypeDict } from '../../utils/dicts'
import './ClientsPage.css'

const filterNames = {
	name: 'Поиск по имени клиента',
	creation_date: 'Поиск по дате',
}

const ClientsPage = () => {
	const dispatch = useDispatch()

	const [filterValues, setFilterValues] = useState({})

	const { showPopup, parameter, renderPopUp, togglePopup } = usePopup(false, [
		'creation_date',
	])

	const [showCreatePopup, setShowCreatePopup] = useState(false)
	const [showWarningPopup, setShowWarningPopup] = useState(false)
	const [showWarningPopupAll, setShowWarningPopupAll] = useState(false)

	const [showLoginInfo, setsSowLoginInfo] = useState(false)

	const [parametersRow, setParametersRow] = useState({})
	// console.log(parametersRow)

	const clientRows = useSelector(state => state.clients.clients)
	const isFetching = useSelector(state => state.clients.isFetching)

	const getClientRow = clients => {
		return clients?.map(el => {
			return { ...el.client, login_type: el.login_type.login_type }
		})
	}

	const clientRow = getClientRow(clientRows)

	const dayInMonthComparator = (v1, v2) => {
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

		const dateObject = new Date(year, month, day, hours, minutes)

		return dateObject
	}

	const columnsClients = [
		{
			field: `id`,
			headerName: `ID`,
			width: 70,
			sortable: true,
			editable: false,
			filterable: false,
			hideable: false,
		},
		{
			field: `name`,
			headerName: `Клиент`,
			flex: 1,
			// width: 150,
			sortable: true,
			editable: false,
			filterable: false,
			hideable: false,
		},
		{
			field: `max_accounts`,
			headerName: `Максимальное кол-во аккаунтов`,
			// width: 260,
			flex: 1,
			sortable: false,
			editable: false,
			filterable: false,
			hideable: false,
		},
		{
			field: `creation_date`,
			headerName: `Дата создания`,
			// width: 170,
			flex: 1,
			sortable: true,
			editable: false,
			filterable: false,
			hideable: false,
			sortComparator: dayInMonthComparator,
			renderCell: params => {
				return params.row.creation_date
			},
		},
		{
			field: `instruction`,
			headerName: `Инструкция`,
			// width: 300,
			flex: 1,
			sortable: false,
			editable: false,
			filterable: false,
			hideable: false,
		},
		{
			field: `login_type`,
			headerName: `Тип логина`,
			// width: 300,
			flex: 1,
			sortable: false,
			editable: false,
			filterable: false,
			hideable: false,
			renderCell: params => {
				return <span>{loginTypeDict[params.row.login_type]}</span>
			},
		},
		{
			field: 'action',
			headerName: 'Действия',
			// width: 200,
			flex: 1,
			sortable: false,
			editable: false,
			hideable: false,
			renderCell: params => {
				return (
					<div className='action-group'>
						<div className='action-group__login'>
							<button
								className='action-group__login--btn'
								onClick={e => {
									setsSowLoginInfo(true)
									getLoginId(e, params.row.id)
								}}
							>
								Логины
							</button>
						</div>
						<div>
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

	const userID = useSelector(state => state.bx.userId)
	const initials = useSelector(state => state.bx.initials)

	const secretKey = getUserInitials(
		initials.NAME,
		initials.LAST_NAME,
		initials.SECOND_NAME
	)

	const getLoginId = (e, id) => {
		if (e) e.stopPropagation()

		const formStateLogins = {
			bitrix_id: +userID,
			secret_key: `${secretKey}`,
			login_type: null,
			users_list: null,
			clients_list: [id],
		}

		dispatch(getAdminLogin({ formStateLogins }))
	}

	const onItemCreated = React.useCallback(
		formState => {
			const formStateCreate = {
				bitrix_id: +userID,
				secret_key: `${secretKey}`,
				name: formState.name,
				max_accounts: +formState?.max_accounts,
				login_type: +formState?.login_type,
				instruction: formState?.instruction,
			}
			dispatch(createAdminClient({ formStateCreate }))
		},
		[secretKey]
	)

	const renderCreatePopUp = () => {
		return (
			<PopUp onClose={() => setShowCreatePopup(false)}>
				<CreateItem
					columns={columnsClients}
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

	// DELETE CLIENTS

	const [sizeSelectesRows, setSizeSelectesRows] = useState([])
	// console.log(sizeSelectesRows)

	const getIdsSelectedRows = selectedRowData => {
		return selectedRowData.map(item => {
			return item.id
		})
	}

	//WARNING DELETE

	const handleDelete = (e, ids) => {
		if (e) e.stopPropagation()
		// console.log(id)
		const formStateClients = {
			bitrix_id: userID,
			secret_key: `${secretKey}`,
			delete_ids: ids,
		}

		dispatch(deleteAdminClients({ formStateClients })).then(resp => {
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

	// PAGINATION
	const PAGE_SIZE = 5

	const [paginationModel, setPaginationModel] = React.useState({
		pageSize: PAGE_SIZE,
		page: 0,
	})

	const clientsLogins = useSelector(state => state.clients.clientsLogin)

	//LOGIN INFO
	const loginInfoPopup = () => {
		return (
			<PopUp
				onClose={() => {
					setsSowLoginInfo(false)
				}}
				className='modal-logins-info'
			>
				<LoginsInfo
					title={'Cведения о логинах клиента'}
					items={clientsLogins}
					entity={'clients'}
				/>
			</PopUp>
		)
	}

	return (
		<>
			{isFetching ? (
				<Loader />
			) : (
				<div className='clients'>
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
								rowSelectionModel={sizeSelectesRows}
								onRowSelectionModelChange={ids => {
									const selectedIDs = new Set(ids)
									const selectedRowData = clientRow.filter(row =>
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

					{showLoginInfo && loginInfoPopup()}
				</div>
			)}{' '}
		</>
	)
}

export default ClientsPage

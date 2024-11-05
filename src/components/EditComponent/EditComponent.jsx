import React, { useMemo, useState } from 'react'

import { useDispatch } from 'react-redux'
import usePopup from '../../hooks/usePopup'
import { updateAdminClient } from '../../redux/slices/adminClientsSlice/adminClientsSlice'
import { updateAdminUser } from '../../redux/slices/adminUsersSlice/adminUsersSlice'
import { clientsDict, LoginDict, usersDict } from '../../utils/dicts'
import Button from '../Button/Button'
import './EditComponent.css'

const EditComponent = ({ item, chapter, onClose }) => {
	const dispatch = useDispatch()

	const { togglePopup } = usePopup()

	const [isEditing, setIsEditing] = useState({})
	// console.log(item, chapter)

	const itemNeededFields = { ...item }
	delete itemNeededFields.creation_date

	const filedNameCollection = Object.entries(
		chapter === 'login' ? itemNeededFields.login : itemNeededFields
	)

	const findvalue = (key, dict) => {
		return dict
			.filter(field => field.field === key)
			.map(name => {
				return name.headerName
			})
	}

	const setNeededDict = (key, chapter) => {
		if (chapter === 'users') {
			return findvalue(key, usersDict)
		}
		if (chapter === 'clients') {
			return findvalue(key, clientsDict)
		}
		if (chapter === 'login') {
			return findvalue(key, LoginDict)
		}
	}

	const handleClickOutside = event => {
		if (!event?.target) return
		if (!event.target.closest('.edit-item')) {
			setIsEditing({})
		}
	}

	const handleEditClick = key => {
		setIsEditing({ ...isEditing, [key]: true })
	}

	const [newvalue, setNewValue] = useState(
		chapter === 'login'
			? { ...itemNeededFields.login }
			: { ...itemNeededFields }
	)
	console.log(newvalue)

	const onHandleUpdate = () => {
		if (chapter === 'clients') {
			const formStateUpdate = {
				bitrix_id: 225,
				secret_key: 'Смородин Борис Борисович',
				client_info: [
					{
						id: +newvalue.id,
						name: newvalue.name,
						max_accounts: +newvalue.max_accounts,
						login_type: +newvalue.login_type_id,
						instruction: newvalue.instruction,
					},
				],
			}

			dispatch(updateAdminClient({ formStateUpdate }))
		}
		if (chapter === 'users') {
			const formStateUpdate = {
				bitrix_id: 225,
				secret_key: 'Смородин Борис Борисович',
				user_info: [
					{
						id: +newvalue.id,
						bitrix_id: +newvalue.name,
						username: newvalue.username,
					},
				],
			}

			dispatch(updateAdminUser({ formStateUpdate }))
		}
		onClose()
	}

	const renderingItem = useMemo(() => {
		return filedNameCollection.map(([key, value], index) => {
			return (
				<div
					className='edit-item'
					key={index}
					onClick={() => handleClickOutside()}
				>
					<span className='edit-item__key'>{setNeededDict(key, chapter)}:</span>
					{!isEditing[key] ? (
						<span
							className='edit-item__value'
							onClick={e => handleEditClick(key)}
						>
							{newvalue[key]}
						</span>
					) : (
						<input
							className='edit-item__input'
							type='text'
							value={newvalue[key]}
							onChange={e => {
								setNewValue({ ...newvalue, [key]: e.target.value })
							}}
							onBlur={() => setIsEditing({ ...isEditing, [key]: false })}
							autoFocus
						/>
					)}
				</div>
			)
		})
	}, [filedNameCollection, isEditing, newvalue])

	return (
		<div className='edit'>
			{renderingItem}
			<Button
				className={'button-send__end'}
				text={'Отправить'}
				onClick={onHandleUpdate}
			/>
		</div>
	)
}

export default EditComponent

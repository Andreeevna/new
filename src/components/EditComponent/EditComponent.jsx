import React, { useMemo, useState } from 'react'

import { useDispatch } from 'react-redux'
import { updateAdminClient } from '../../redux/slices/adminClientsSlice/adminClientsSlice'
import { updateAdminLogin } from '../../redux/slices/adminLoginSlice/adminLoginSlice'
import { updateAdminUser } from '../../redux/slices/adminUsersSlice/adminUsersSlice'
import { clientsDict, LoginDict, usersDict } from '../../utils/dicts'
import Button from '../Button/Button'
import './EditComponent.css'

const EditComponent = ({ item, chapter, onClose, IGNORE_FIELDS = [] }) => {
	const dispatch = useDispatch()

	const [isEditing, setIsEditing] = useState({})

	const itemNeededFields = useMemo(() => {
		return IGNORE_FIELDS.reduce((acc, current) => {
			const result = current.split('.').reduce(
				(accum, key, index, array) => {
					if (array.length - 1 === index) {
						accum.key = key
						return accum
					}
					accum.value = accum.value[key]

					return accum
				},
				{ key: '', value: acc }
			)

			delete result.value[result.key]
			return acc
		}, JSON.parse(JSON.stringify(item)))
	}, [IGNORE_FIELDS, item])

	const filedNameCollection = Object.entries(
		chapter === 'login'
			? {
					...itemNeededFields.login,
					client: {
						edit: itemNeededFields.client.id,
						readOnly: itemNeededFields.client.name,
					},
					clientID: itemNeededFields.client.id,
					user: itemNeededFields.user.id,
			  }
			: itemNeededFields
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
			? {
					...itemNeededFields.login,
					client: {
						edit: itemNeededFields.client.id,
						readOnly: itemNeededFields.client.name,
					},
					clientID: itemNeededFields.client.id,
					user: itemNeededFields.user.id,
			  }
			: { ...itemNeededFields }
	)

	const updateNewValue = ({ key, value, isEdit }) => {
		const newState = { ...newvalue }
		console.log(key)
		if (isEdit) {
			newState[key].edit = value
		} else {
			newState[key] = value
		}
		setNewValue(newState)
	}

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

		if (chapter === 'login') {
			const formStateUpdate = {
				bitrix_id: 225,
				secret_key: 'Смородин Борис Борисович',
				login_info: [
					{
						id: +newvalue.id,
						login: newvalue.login,
						password: newvalue.password,
						login_2fa: newvalue.login_two_fa,
						password_2fa: newvalue.password_two_fa,
						secret: newvalue.secret,
						client_id: +newvalue.client.edit,
						user_id: +newvalue.user,
					},
				],
			}
			console.log(formStateUpdate)
			dispatch(updateAdminLogin({ formStateUpdate }))
		}
		onClose()
	}

	const renderingItem = useMemo(() => {
		return filedNameCollection.map(([key, value], index) => {
			const header = setNeededDict(key, chapter)
			if (!header.length) return null

			return (
				<div
					className='edit-item'
					key={index}
					onClick={() => handleClickOutside()}
				>
					<span className='edit-item__key'>{header}:</span>
					{!isEditing[key] ? (
						<span
							className='edit-item__value'
							onClick={e => handleEditClick(key)}
						>
							{newvalue[key]?.readOnly
								? `${newvalue[key].readOnly}, ${newvalue[key].edit}`
								: newvalue[key]}
						</span>
					) : (
						<>
							{newvalue[key]?.readOnly ? (
								<span className='edit-item__span-read'>
									{newvalue[key]?.readOnly || ''}
								</span>
							) : null}

							<input
								className='edit-item__input'
								type='text'
								value={newvalue[key]?.edit || newvalue[key]}
								onChange={e => {
									updateNewValue({
										value: e.target.value,
										key,
										isEdit: newvalue[key]?.edit,
									})
								}}
								onBlur={() => setIsEditing({ ...isEditing, [key]: false })}
								autoFocus
							/>
						</>
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

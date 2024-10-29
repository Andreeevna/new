import React, { useMemo, useState } from 'react'

import { useDispatch } from 'react-redux'
import { createAdminClient } from '../../redux/slices/adminGetSlice/adminGetReducer'
import Button from '../Button/Button'
import './CreateItem.css'

const IGNORED_FIELD = ['id', 'creation_date', 'action']

const CreateItem = ({ columns }) => {
	const dispatch = useDispatch()
	const [formState, setFormState] = useState({})

	const updateFormState = (key, value) => {
		formState[key] = value
		setFormState({ ...formState })
	}

	// 	{
	// 		"bitrix_id": 0,
	// 		"secret_key": "string",
	// 		"name": "string",
	// 		"max_accounts": 0,
	// 		"login_type": 0,
	// 		"instruction": "string"
	// 	}

	const formStateCreate = {
		bitrix_id: 225,
		secret_key: 'Смородин Борис Борисович',
		name: formState.name,
		max_accounts: +formState?.max_accounts,
		login_type: +formState?.login_type_id,
		instruction: formState?.instruction,
	}

	console.log(formStateCreate)

	const itemTODO = useMemo(() => {
		return columns
			?.filter(column => !IGNORED_FIELD.includes(column.field))
			.map(column => {
				return (
					<div key={column?.field} className='create-item__item'>
						<span className='create-item__header'>
							{column?.field !== 'action' && column?.headerName}
						</span>
						{column?.field !== 'action' ? (
							<input
								className='create-item__input'
								type='text'
								name={column?.field}
								placeholder={'Введите необходимые данные..'}
								onChange={e => updateFormState(column?.field, e.target.value)}
							/>
						) : null}
					</div>
				)
			})
	}, [columns])

	const sendItemHandler = () => {
		dispatch(createAdminClient({ formStateCreate }))
		console.log(formState)
		console.log('create')
	}

	const isValid = useMemo(() => {
		return columns?.every(item => {
			if (IGNORED_FIELD.includes(item.field)) {
				return true
			}
			return !!formState[item.field]
		})
	}, [columns, formState])

	return (
		<div className='create-item'>
			<h2 className='create-item__title'>Создание элемента таблицы</h2>
			{itemTODO}
			<Button
				text='Создать'
				className={'button-send__center'}
				onClick={sendItemHandler}
				disabled={!isValid}
			/>
		</div>
	)
}

export default CreateItem

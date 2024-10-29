import React, { useMemo, useState } from 'react'

import Button from '../Button/Button'
import './CreateItem.css'

const IGNORED_FIELD = ['creation_date', 'action']

const CreateItem = ({ columns }) => {
	const [formState, setFormState] = useState({})
	console.log(formState)

	const updateFormState = (key, value) => {
		formState[key] = value
		setFormState({ ...formState })
		console.log(key, value)
	}

	// 	{
	// 		"bitrix_id": 0,
	// 		"secret_key": "string",
	// 		"name": "string",
	// 		"max_accounts": 0,
	// 		"login_type": 0,
	// 		"instruction": "string"
	// 	}

	// 	id
	// :
	// "2"
	// instruction
	// :
	// "int"
	// login_type_id
	// :
	// "2"
	// max_accounts
	// :
	// "4"
	// name
	// :
	// "Борис"

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
	console.log(columns)

	const sendItemHandler = () => {
		console.log('create')
	}

	const isValid = useMemo(() => {
		return columns?.every(item => {
			if (IGNORED_FIELD.includes(item.field)) {
				return true
			}
			console.log(item.field)
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

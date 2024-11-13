import React, { useMemo, useState } from 'react'

import Button from '../Button/Button'
import './CreateItem.css'

const CreateItem = ({ columns, IGNORED_FIELD, onItemCreated }) => {
	const [formState, setFormState] = useState({})

	const updateFormState = (key, value) => {
		formState[key] = value
		setFormState({ ...formState })
	}
	console.log(formState)

	const itemTODO = useMemo(() => {
		return columns
			?.filter(column => {
				return !IGNORED_FIELD.includes(column.field)
			})
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
								value={formState[column?.field]}
								name={column?.field}
								placeholder={'Введите необходимые данные..'}
								onChange={e => updateFormState(column?.field, e.target.value)}
							/>
						) : null}
					</div>
				)
			})
	}, [columns, formState])

	const sendItemHandler = () => {
		onItemCreated(formState)
		const data = Object.keys(formState).reduce((acc, key) => {
			acc[key] = ''
			return acc
		}, {})
		setFormState({ ...data })
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
				text='Сохранить'
				className={'button-send__center'}
				onClick={sendItemHandler}
				disabled={!isValid}
			/>
		</div>
	)
}

export default CreateItem

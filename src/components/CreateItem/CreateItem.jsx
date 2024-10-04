import React, { useMemo, useState } from 'react'

import Button from '../Button/Button'
import './CreateItem.css'

const CreateItem = ({ columns }) => {
	const [formState, setFormState] = useState({})
	console.log(formState)

	const updateFormState = (key, value) => {
		formState[key] = value
		setFormState({ ...formState })
		console.log(key, value)
	}

	const itemTODO = useMemo(() => {
		return columns?.map(column => {
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

	return (
		<div className='create-item'>
			<h2 className='create-item__title'>Создание элемента таблицы</h2>
			{itemTODO}
			<Button
				text='Создать'
				className={'button-send__center'}
				onClick={sendItemHandler}
			/>
		</div>
	)
}

export default CreateItem

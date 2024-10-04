import React, { useMemo } from 'react'

import Button from '../Button/Button'
import './CreateItem.css'

const CreateItem = ({ columns }) => {
	const itemTODO = useMemo(() => {
		return columns?.map(column => {
			return (
				<div key={column?.field}>
					<span className='create-item__header'>
						{column?.field !== 'action' && column?.headerName}
					</span>
					{column?.field !== 'action' ? (
						<input
							className='create-item__input'
							type='text'
							name={column?.field}
							placeholder={column?.field}
						/>
					) : null}
				</div>
			)
		})
	}, [columns])
	console.log(columns)
	return (
		<div className='create-item'>
			<h2 className='create-item__title'>Создайте элемент</h2>
			{itemTODO}
			<Button text='Добавить' />
		</div>
	)
}

export default CreateItem

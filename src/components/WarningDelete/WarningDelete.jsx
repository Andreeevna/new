import React from 'react'

import Button from '../Button/Button'
import './WarningDelete.css'

const WarningDelete = ({ handleDelete, parametersRow, onCancel }) => {
	return (
		<div className='warning-delete__container'>
			<p className='warning-delete__title'>
				Вы действительно хотите удалить элемент?
			</p>
			<div className='warning-delete__buttons'>
				<Button
					classNameBtn='warning-delete__agree'
					text={'Удалить'}
					onClick={() =>
						handleDelete(parametersRow.e, parametersRow.params.row.id)
					}
				/>
				<Button
					classNameBtn='warning-delete__cancellation'
					text={'Отменить'}
					onClick={() => onCancel(false)}
				/>
			</div>
		</div>
	)
}

export default WarningDelete

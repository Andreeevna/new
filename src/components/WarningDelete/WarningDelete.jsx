import React from 'react'

import Button from '../Button/Button'
import './WarningDelete.css'

const WarningDelete = ({
	title,
	confirmText,
	cancelText,
	onConfirm,
	onCancel,
	parametersRow,
	setParametersRow,
}) => {
	return (
		<div className='warning-delete__container'>
			<p className='warning-delete__title'>{title}</p>
			<div className='warning-delete__buttons'>
				<Button
					classNameBtn='warning-delete__agree'
					text={confirmText}
					onClick={() =>
						onConfirm(parametersRow.e, parametersRow.params.row.id)
					}
				/>
				<Button
					classNameBtn='warning-delete__cancellation'
					text={cancelText}
					onClick={() => {
						onCancel(false)
						setParametersRow({})
					}}
				/>
			</div>
		</div>
	)
}

export default WarningDelete

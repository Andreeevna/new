import * as React from 'react'

import { createPortal } from 'react-dom'

import clsx from 'clsx'
import './PopUp.css'

const PopUp = ({ onClose = null, children, className = 'modal-classic' }) => {
	const handleClick = e => {
		const inModal = e.target.classList.contains('popup')
		if (!inModal) return
		onClose()
	}

	const modal = (
		<div className={'popup'} onClick={handleClick}>
			<div data-id='modal' className={clsx('popup_active', className)}>
				{children}
			</div>
		</div>
	)
	return createPortal(modal, document.getElementById('modals'))
}

export default PopUp

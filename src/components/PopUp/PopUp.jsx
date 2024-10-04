import * as React from 'react'

import { createPortal } from 'react-dom'

import './PopUp.css'

const PopUp = ({ id = null, chapter = '', onClose = null, children }) => {
	const handleClick = e => {
		const inModal = e.target.closest('[data-id=modal]')
		if (inModal) return
		onClose()
	}

	const modal = (
		<div className={'popup'} onClick={handleClick}>
			<div data-id='modal' className={'popup_active'}>
				{children}
			</div>
		</div>
	)
	return createPortal(modal, document.getElementById('modals'))
}

export default PopUp

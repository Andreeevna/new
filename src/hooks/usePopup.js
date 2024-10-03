import React, { useState } from 'react'
import PopUp from '../components/PopUp/PopUp'

const usePopup = (initialState = false) => {
	const [showPopup, setShowPopup] = useState(initialState)
	const [parameter, setParameter] = useState(null)

	const renderPopUp = (e = null, id = null, chapter = '') => {
		if (e) e.stopPropagation()

		if (id && chapter) {
			return (
				<PopUp id={id} chapter={chapter} onClose={() => setShowPopup(false)} />
			)
		}
	}

	const togglePopup = (e, id, chapter) => {
		setShowPopup(true)
		renderPopUp(e, id, chapter)
		setParameter(id)
	}

	return { showPopup, parameter, renderPopUp, togglePopup }
}

export default usePopup

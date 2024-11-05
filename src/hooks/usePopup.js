import React, { useState } from 'react'
import PopUp from '../components/PopUp/PopUp'
import EditPage from '../pages/EditPage/EditPage'

const usePopup = (initialState = false) => {
	const [showPopup, setShowPopup] = useState(initialState)
	const [parameter, setParameter] = useState(null)

	const renderPopUp = (e = null, id = null, chapter = '') => {
		if (e) e.stopPropagation()

		if (id && chapter) {
			return (
				<PopUp onClose={() => setShowPopup(false)}>
					{id && chapter && <EditPage id={id} chapter={chapter} />}
				</PopUp>
			)
		}
	}

	const togglePopup = (e, id, chapter) => {
		setShowPopup(true)
		renderPopUp(e, id, chapter)
		setParameter(id)
	}

	return { showPopup, parameter, renderPopUp, togglePopup, setShowPopup }
}

export default usePopup

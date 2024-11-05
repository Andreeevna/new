import React, { useState } from 'react'
import PopUp from '../components/PopUp/PopUp'
import EditPage from '../pages/EditPage/EditPage'

const usePopup = (initialState = false) => {
	const [showPopup, setShowPopup] = useState(initialState)
	const [parameter, setParameter] = useState(null)

	const renderPopUp = (e = null, id = null, chapter = '') => {
		if (e) {
			e.stopPropagation()
		}

		if (id && chapter) {
			return (
				<PopUp onClose={() => setShowPopup(false)} showPopup={showPopup}>
					{id && chapter && <EditPage id={id} chapter={chapter} />}
				</PopUp>
			)
		}
	}

	const togglePopup = (e, id, chapter, close = true) => {
		console.log(close)
		// setShowPopup(true)
		setShowPopup(close)
		setTimeout(() => {
			renderPopUp(e, id, chapter)
		}, 1000)
		setParameter(id)
	}

	return { showPopup, parameter, renderPopUp, togglePopup }
}

export default usePopup

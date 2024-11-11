import React from 'react'
import EditComponent from '../../components/EditComponent/EditComponent'
import { getProductById } from '../../utils/operationsOnItem'
import './EditPage.css'
const EditPage = ({ id, chapter, onClose, IGNORE_FIELDS }) => {
	// const { id, chapter } = useParams()

	const item = getProductById(id, chapter)
	return (
		<div className='edit-page'>
			<h1 className='edit-page__title'>Редактирование элемента таблицы</h1>
			<EditComponent
				item={chapter === 'clients' ? item.client : item}
				chapter={chapter}
				onClose={onClose}
				IGNORE_FIELDS={IGNORE_FIELDS}
			/>
		</div>
	)
}

export default EditPage

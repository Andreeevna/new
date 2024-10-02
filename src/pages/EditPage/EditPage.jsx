import React from 'react'
import { useParams } from 'react-router-dom'
import EditComponent from '../../components/EditComponent/EditComponent'
import { getProductById } from '../../utils/operationsOnItem'
import './EditPage.css'

const EditPage = () => {
	const { id, chapter } = useParams()

	const item = getProductById(id, chapter)
	return (
		<div className='edit-page'>
			<h1>Страница редактирования</h1>
			<EditComponent item={item} chapter={chapter} />
		</div>
	)
}

export default EditPage

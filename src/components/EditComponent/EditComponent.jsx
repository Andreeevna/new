import React, { useMemo, useState } from 'react'

import {
	clientsDict,
	codeLoginsDict,
	smsLoginsDict,
	usersDict,
} from '../../utils/dicts'
import './EditComponent.css'

const EditComponent = ({ item, chapter }) => {
	const [isEditing, setIsEditing] = useState({})

	const filedNameCollection = Object.entries(item)

	const findvalue = (key, dict) => {
		return dict
			.filter(field => field.field === key)
			.map(name => {
				return name.headerName
			})
	}

	const setNeededDict = (key, chapter) => {
		if (chapter === 'users') {
			return findvalue(key, usersDict)
		}
		if (chapter === 'clients') {
			return findvalue(key, clientsDict)
		}

		if (chapter === 'loginsms') {
			return findvalue(key, smsLoginsDict)
		}

		if (chapter === 'logincode') {
			return findvalue(key, codeLoginsDict)
		}
	}

	const handleClickOutside = event => {
		if (!event?.target) return
		if (!event.target.closest('.edit-item')) {
			setIsEditing({})
		}
	}

	const handleEditClick = key => {
		setIsEditing({ ...isEditing, [key]: true })
	}

	const [newvalue, setNewValue] = useState({ ...item })
	console.log(newvalue)

	const renderingItem = useMemo(() => {
		return filedNameCollection.map(([key, value], index) => {
			return (
				<div
					className='edit-item'
					key={index}
					onClick={() => handleClickOutside()}
				>
					<span className='edit-item__key'>{setNeededDict(key, chapter)}:</span>
					{!isEditing[key] ? (
						<span
							className='edit-item__value'
							onClick={e => handleEditClick(key)}
						>
							{newvalue[key]}
						</span>
					) : (
						<input
							type='text'
							value={newvalue[key] || ''}
							onChange={e =>
								setNewValue({ ...newvalue, [key]: e.target.value })
							}
							onBlur={() => setIsEditing({ ...isEditing, [key]: false })}
							autoFocus
						/>
					)}
				</div>
			)
		})
	}, [filedNameCollection, isEditing, newvalue])

	return (
		<div className='edit'>
			{renderingItem}
			<div className='edit-send'>
				<button className='edit-send__btn'>Отправить</button>
			</div>
		</div>
	)
}

export default EditComponent

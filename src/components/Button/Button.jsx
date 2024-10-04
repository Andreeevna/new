import React from 'react'

import clsx from 'clsx'
import './Button.css'

const Button = ({ className, text }) => {
	return (
		<div className={clsx('button-send', className)}>
			<button className='button-send__btn'>{text}</button>
		</div>
	)
}

export default Button

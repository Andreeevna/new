import React from 'react'

import clsx from 'clsx'
import './Button.css'

const Button = ({
	className,
	classNameBtn,
	text = '',
	onClick = null,
	disabled,
}) => {
	return (
		<div className={clsx('button-send', className)}>
			<button
				className={clsx('button-send__btn', classNameBtn)}
				onClick={onClick}
				disabled={disabled}
			>
				{text}
			</button>
		</div>
	)
}

export default Button

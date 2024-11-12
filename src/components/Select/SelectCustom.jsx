import React from 'react'

import { Box, FormControl, MenuItem } from '@mui/material'
import Select from '@mui/material/Select'

import './Select.css'

const SelectCustom = ({ options, onChange, value }) => {
	// const options = [
	// 	{ label: 31, name: 'Тестовый клиент PUSH' },
	// 	{ label: 32, name: 'Тестовый клиент' },
	// 	{ label: 34, name: 'Тестовый' },
	// 	{ label: 40, name: 'YJDSQ' },
	// 	{
	// 		label: 11,
	// 		name: 'Тестовый клиент PUSH Тестовый клиент PUSHТестовый клиент PUSHТестовый клиент PUSHТестовый клиент PUSHТестовый клиент PUSHТестовый клиент PUSHТестовый клиент PUSHТестовый клиент PUSHv',
	// 	},
	// ]
	// const [selectedOption, setSelectedOption] = useState()
	// console.log(selectedOption)

	const handleChange = e => {
		e.stopPropagation()
		// setSelectedOption(e.target.value.toString())
		onChange(e)
	}

	if (!options.find(item => `${item.label}` === `${value}`)) return
	return (
		<Box sx={{ width: 300 }}>
			<FormControl fullWidth>
				<Select
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					value={options.length > 0 ? `${value}` : ''}
					defaultValue=''
					onChange={handleChange}
					sx={{ height: '25px' }}
					MenuProps={{
						style: {
							maxHeight: 250,
							maxWidth: 450,
						},
					}}
				>
					{options.map((option, index) => (
						<MenuItem key={index} value={`${option.label}`}>
							{option.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	)
}

export default SelectCustom

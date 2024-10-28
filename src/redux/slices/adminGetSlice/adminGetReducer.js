import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAPI } from '../../../api/getApi'

export const getAdminClients = createAsyncThunk(
	'incom/getClients',
	async params => {
		const { formState } = params
		try {
			const { data } = await getAPI.getClients(formState)
			return data
		} catch (error) {
			console.error('Ошибка при получении клиентов', error)
			throw error.response.status
		}
	}
)

const initialState = {
	data: null,
}
export const adminGetReducer = createSlice({
	name: 'incom',
	initialState,
	reducers: {},
	extraReducers: builder => {
		// getClients
		builder.addCase(getAdminClients.pending, state => {})
		builder.addCase(getAdminClients.fulfilled, (state, action) => {
			console.log(action.payload.response)
		})
		builder.addCase(getAdminClients.rejected, state => {})
	},
})

export const {} = adminGetReducer.actions

export default adminGetReducer.reducer

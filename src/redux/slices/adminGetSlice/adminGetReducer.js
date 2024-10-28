import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAPI } from '../../../api/getApi'
import { ERROR } from '../../../constants/api'

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
	message: null,
	isFetching: false,
}
export const adminGetReducer = createSlice({
	name: 'incom',
	initialState,
	reducers: {},
	extraReducers: builder => {
		// getClients
		builder.addCase(getAdminClients.pending, state => {
			state.isFetching = true
			state.message = null
		})
		builder.addCase(getAdminClients.fulfilled, (state, action) => {
			console.log(action.payload.response, 'clients')
			state.isFetching = false
			state.message = null
			state.data = action.payload.response
		})
		builder.addCase(getAdminClients.rejected, state => {
			state.message = ERROR
		})
	},
})

export const {} = adminGetReducer.actions

export default adminGetReducer.reducer

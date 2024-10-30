import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAPI } from '../../../api/getApi'
import { ERROR } from '../../../constants/api'

export const getAdminLogins = createAsyncThunk(
	'logins/getAdminLogins',
	async params => {
		const { formStateLogins } = params
		try {
			const { data } = await getAPI.getLogins(formStateLogins)
			return data
		} catch (error) {
			console.error('Ошибка при получении логинов', error)
			throw error.response.status
		}
	}
)

const initialState = {
	logins: [],
	message: null,
	isFetching: false,
}
export const adminLoginsReducer = createSlice({
	name: 'logins',
	initialState,
	reducers: {
		deleteLocalLogin: (state, action) => {
			// state.clients = state.clients.filter(item => item.id !== action.payload)
		},
	},
	extraReducers: builder => {
		//getAdminLogins
		builder.addCase(getAdminLogins.pending, state => {
			state.isFetching = true
			state.message = null
		})
		builder.addCase(getAdminLogins.fulfilled, (state, action) => {
			console.log(action.payload.response, 'logins')
			state.isFetching = false
			state.message = null
			state.logins = action.payload.response
		})
		builder.addCase(getAdminLogins.rejected, state => {
			state.message = ERROR
		})
	},
})

export const {} = adminLoginsReducer.actions

export default adminLoginsReducer.reducer

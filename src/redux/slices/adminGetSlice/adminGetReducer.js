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

export const getAdminUsers = createAsyncThunk(
	'incom/getAdminUsers',
	async params => {
		const { formStateUsers } = params
		try {
			const { data } = await getAPI.getUsers(formStateUsers)
			return data
		} catch (error) {
			console.error('Ошибка при получении пользователей', error)
			throw error.response.status
		}
	}
)

const initialState = {
	clients: [],
	users: [],
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
			state.clients = action.payload.response
		})
		builder.addCase(getAdminClients.rejected, state => {
			state.message = ERROR
		})

		//getAdminUsers
		builder.addCase(getAdminUsers.pending, state => {
			state.isFetching = true
			state.message = null
		})
		builder.addCase(getAdminUsers.fulfilled, (state, action) => {
			console.log(action.payload.response, 'users')
			state.isFetching = false
			state.message = null
			state.users = action.payload.response
		})
		builder.addCase(getAdminUsers.rejected, state => {
			state.message = ERROR
		})
	},
})

export const {} = adminGetReducer.actions

export default adminGetReducer.reducer
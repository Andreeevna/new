import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAPI } from '../../../api/createApi'
import { getAPI } from '../../../api/getApi'
import { ERROR } from '../../../constants/api'

export const getAdminUsers = createAsyncThunk(
	'users/getAdminUsers',
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

export const createAdminClient = createAsyncThunk(
	'users/createAdminClient',
	async params => {
		const { formStateCreate } = params
		try {
			const { data } = await createAPI.createClient(formStateCreate)
			return data
		} catch (error) {
			console.error('Ошибка при создании клиента', error)
			throw error.response.status
		}
	}
)

export const deleteAdminClients = createAsyncThunk(
	'users/deleteAdminClients',
	async params => {
		const { formStateClient } = params
		try {
			const { data } = await getAPI.deleteClient(formStateClient)
			return data
		} catch (error) {
			console.error('Ошибка при удалении клиента', error)
			throw error.response.status
		}
	}
)

const initialState = {
	users: [],
	message: null,
	isFetching: false,
}
export const adminUsersReducer = createSlice({
	name: 'users',
	initialState,
	reducers: {
		deleteLocalUser: (state, action) => {
			// state.clients = state.clients.filter(item => item.id !== action.payload)
		},
	},
	extraReducers: builder => {
		//getAdminUsers
		builder.addCase(getAdminUsers.pending, state => {
			state.isFetching = true
			state.message = null
		})
		builder.addCase(getAdminUsers.fulfilled, (state, action) => {
			state.isFetching = false
			state.message = null
			state.users = action.payload.response
		})
		builder.addCase(getAdminUsers.rejected, state => {
			state.message = ERROR
		})
	},
})

export const {} = adminUsersReducer.actions

export default adminUsersReducer.reducer

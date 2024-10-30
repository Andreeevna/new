import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAPI } from '../../../api/createApi'
import { getAPI } from '../../../api/getApi'
import { ERROR } from '../../../constants/api'

export const getAdminClients = createAsyncThunk(
	'clients/getClients',
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

export const getAdminLogins = createAsyncThunk(
	'clients/getAdminLogins',
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

export const createAdminClient = createAsyncThunk(
	'clients/createAdminClient',
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
	'clients/deleteAdminClients',
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
	clients: [],
	logins: [],
	message: null,
	isFetching: false,
}
export const adminClientsReducer = createSlice({
	name: 'clients',
	initialState,
	reducers: {
		deleteLocalClient: (state, action) => {
			state.clients = state.clients.filter(item => item.id !== action.payload)
		},
	},
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

		//createAdminClient
		builder.addCase(createAdminClient.pending, state => {
			state.isFetching = true
			state.message = null
		})
		builder.addCase(createAdminClient.fulfilled, (state, action) => {
			state.isFetching = false
			state.message = null
			state.clients.push(action.payload.record)
		})
		builder.addCase(createAdminClient.rejected, state => {
			state.message = ERROR
		})

		//deleteAdminClients
		builder.addCase(deleteAdminClients.pending, state => {
			state.isFetching = true
			state.message = null
		})
		builder.addCase(deleteAdminClients.fulfilled, (state, action) => {
			state.isFetching = false
			state.message = null
		})
		builder.addCase(deleteAdminClients.rejected, state => {
			state.message = ERROR
		})
	},
})

export const { deleteLocalClient } = adminClientsReducer.actions

export default adminClientsReducer.reducer

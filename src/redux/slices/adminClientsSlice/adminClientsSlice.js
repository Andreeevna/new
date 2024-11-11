import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAPI } from '../../../api/createApi'
import { deleteAPI } from '../../../api/deleteApi'
import { getAPI } from '../../../api/getApi'
import { updateApi } from '../../../api/updateApi'
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

export const updateAdminClient = createAsyncThunk(
	'clients/updateAdminClient',
	async params => {
		const { formStateUpdate } = params
		console.log(formStateUpdate)

		try {
			const { data } = await updateApi.updateClients(formStateUpdate)
			return data
		} catch (error) {
			console.error('Ошибка при создании изменении клиента', error)
			throw error.response.status
		}
	}
)

export const deleteAdminClient = createAsyncThunk(
	'clients/deleteAdminClient',
	async params => {
		const { formStateClient } = params
		try {
			const { data } = await deleteAPI.deleteClient(formStateClient)
			return data
		} catch (error) {
			console.error('Ошибка при удалении клиента', error)
			throw error.response.status
		}
	}
)

export const deleteAdminClients = createAsyncThunk(
	'clients/deleteAdminClients',
	async params => {
		const { formStateClients } = params
		try {
			const { data } = await deleteAPI.deleteClients(formStateClients)
			return data
		} catch (error) {
			console.error('Ошибка при удалении клиентов', error)
			throw error.response.status
		}
	}
)

const initialState = {
	clients: [],
	message: null,
	isFetching: false,
}
export const adminClientsReducer = createSlice({
	name: 'clients',
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
			state.isFetching = false
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
			state.isFetching = false
		})

		//updateAdminClient
		builder.addCase(updateAdminClient.pending, state => {
			state.isFetching = true
			state.message = null
		})
		builder.addCase(updateAdminClient.fulfilled, (state, action) => {
			state.isFetching = false
			state.message = null
			state.clients = state.clients.map(item => {
				if (item.id === action.payload.records?.updated[0].id) {
					return (item = { ...action.payload.records?.updated[0] })
				} else {
					return item
				}
			})
		})
		builder.addCase(updateAdminClient.rejected, state => {
			state.message = ERROR
			state.isFetching = false
		})

		//deleteAdminClient
		builder.addCase(deleteAdminClient.pending, state => {
			state.isFetching = true
			state.message = null
		})
		builder.addCase(deleteAdminClient.fulfilled, (state, action) => {
			state.clients = state.clients.filter(
				item => item.id !== action.payload.record.id
			)

			state.isFetching = false
			state.message = null
		})
		builder.addCase(deleteAdminClient.rejected, state => {
			state.message = ERROR
			state.isFetching = false
		})

		//deleteAdminClients
		builder.addCase(deleteAdminClients.pending, state => {
			state.isFetching = true
			state.message = null
		})
		builder.addCase(deleteAdminClients.fulfilled, (state, action) => {
			state.clients = state.clients.filter(row => {
				return !action.payload.record.some(rowResp => {
					return rowResp.id === row.id
				})
			})
			state.isFetching = false
			state.message = null
		})
		builder.addCase(deleteAdminClients.rejected, state => {
			state.message = ERROR
			state.isFetching = false
		})
	},
})

export const {} = adminClientsReducer.actions

export default adminClientsReducer.reducer

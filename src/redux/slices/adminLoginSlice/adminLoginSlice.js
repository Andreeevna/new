import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAPI } from '../../../api/createApi'
import { deleteAPI } from '../../../api/deleteApi'
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

export const createAdminLogin = createAsyncThunk(
	'logins/createAdminLogin',
	async params => {
		const { formStateCreateLogin } = params
		try {
			const { data } = await createAPI.createLogin(formStateCreateLogin)
			return data
		} catch (error) {
			console.error('Ошибка при создании логина', error)
			// throw error.response.status
		}
	}
)

export const deteleAdminLogin = createAsyncThunk(
	'logins/deteleAdminLogin',
	async params => {
		const { formStateDeleteLogin } = params
		try {
			const { data } = await deleteAPI.deleteLogin(formStateDeleteLogin)
			return data
		} catch (error) {
			console.error('Ошибка при удалении логина', error)
			throw error.response.status
		}
	}
)

export const deteleAdminLogins = createAsyncThunk(
	'logins/deteleAdminLogins',
	async params => {
		const { formStateDeleteLogins } = params
		try {
			const { data } = await deleteAPI.deleteLogins(formStateDeleteLogins)
			return data
		} catch (error) {
			console.error('Ошибка при удалении логинов', error)
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
	reducers: {},
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

		//createAdminLogin
		builder.addCase(createAdminLogin.pending, state => {
			state.isFetching = true
			state.message = null
		})
		builder.addCase(createAdminLogin.fulfilled, (state, action) => {
			state.isFetching = false
			state.message = null
		})
		builder.addCase(createAdminLogin.rejected, state => {
			state.message = ERROR
		})

		//deteleAdminLogin
		builder.addCase(deteleAdminLogin.pending, state => {
			state.isFetching = true
			state.message = null
		})
		builder.addCase(deteleAdminLogin.fulfilled, (state, action) => {
			state.logins = state.logins.filter(row => {
				return row.login.id !== action.payload.record.id
			})
			state.isFetching = false
			state.message = null
		})
		builder.addCase(deteleAdminLogin.rejected, state => {
			state.message = ERROR
		})

		//deteleAdminLogins
		builder.addCase(deteleAdminLogins.pending, state => {
			state.isFetching = true
			state.message = null
		})
		builder.addCase(deteleAdminLogins.fulfilled, (state, action) => {
			state.logins = state.logins.filter(row => {
				return !action.payload.record.some(rowResp => {
					return row.login.id === rowResp.id
				})
			})
			state.isFetching = false
			state.message = null
		})
		builder.addCase(deteleAdminLogins.rejected, state => {
			state.message = ERROR
		})
	},
})

export const {} = adminLoginsReducer.actions

export default adminLoginsReducer.reducer

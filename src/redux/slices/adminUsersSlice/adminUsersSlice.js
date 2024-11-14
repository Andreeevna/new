import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAPI } from '../../../api/createApi'
import { deleteAPI } from '../../../api/deleteApi'
import { getAPI } from '../../../api/getApi'
import { updateApi } from '../../../api/updateApi'
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

export const getAdminLogin = createAsyncThunk(
	'users/getAdminLogin',
	async params => {
		const { formStateLogins } = params
		try {
			const { data } = await getAPI.getLogin(formStateLogins)
			return data
		} catch (error) {
			console.error('Ошибка при получении логинов', error)
			throw error.response.status
		}
	}
)

export const createAdminUser = createAsyncThunk(
	'users/createAdminUser',
	async params => {
		const { formStateCreate } = params
		try {
			const { data } = await createAPI.createUser(formStateCreate)
			return data
		} catch (error) {
			console.error('Ошибка при создании пользователя', error)
			throw error.response.status
		}
	}
)

export const updateAdminUser = createAsyncThunk(
	'users/updateAdminUser',
	async params => {
		const { formStateUpdate } = params
		try {
			const { data } = await updateApi.updateUsers(formStateUpdate)
			return data
		} catch (error) {
			console.error('Ошибка при изменении пользователя', error)
			throw error.response.status
		}
	}
)

export const deleteAdminUser = createAsyncThunk(
	'users/deleteAdminUser',
	async params => {
		const { formStateUser } = params
		try {
			const { data } = await deleteAPI.deleteUser(formStateUser)
			return data
		} catch (error) {
			console.error('Ошибка при удалении пользователя', error)
			throw error.response.status
		}
	}
)

export const deleteAdminUsers = createAsyncThunk(
	'users/deleteAdminUsers',
	async params => {
		const { formStateUsers } = params
		try {
			const { data } = await deleteAPI.deleteUsers(formStateUsers)
			return data
		} catch (error) {
			console.error('Ошибка при удалении пользователей', error)
			throw error.response.status
		}
	}
)

const initialState = {
	users: [],
	usersLogin: [],
	message: null,
	isFetching: false,
}
export const adminUsersReducer = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: builder => {
		//getAdminUsers
		builder.addCase(getAdminUsers.pending, state => {
			state.isFetching = true
			state.message = null
		})
		builder.addCase(getAdminUsers.fulfilled, (state, action) => {
			// console.log(action.payload.response, 'users')
			state.isFetching = false
			state.message = null
			state.users = action.payload.response
		})
		builder.addCase(getAdminUsers.rejected, state => {
			state.message = ERROR
			state.isFetching = false
		})

		//createAdminUser
		builder.addCase(createAdminUser.pending, state => {
			state.isFetching = true
			state.message = null
		})
		builder.addCase(createAdminUser.fulfilled, (state, action) => {
			console.log(action.payload)
			state.isFetching = false
			state.message = null

			if (action.payload.message === 'Created') {
				state.users.push(action.payload.user)
			}
		})
		builder.addCase(createAdminUser.rejected, state => {
			state.message = ERROR
			state.isFetching = false
		})

		//updateAdminUser
		builder.addCase(updateAdminUser.pending, state => {
			state.isFetching = true
			state.message = null
		})
		builder.addCase(updateAdminUser.fulfilled, (state, action) => {
			if (action.payload?.records?.updated) {
				state.users = state.users.map(item => {
					if (item.id === action.payload.records?.updated[0].id) {
						return (item = { ...action.payload.records?.updated[0] })
					} else {
						return item
					}
				})
			}

			state.isFetching = false
			state.message = null
		})
		builder.addCase(updateAdminUser.rejected, state => {
			state.message = ERROR
			state.isFetching = false
		})

		//deleteAdminUser
		builder.addCase(deleteAdminUser.pending, state => {
			state.isFetching = true
			state.message = null
		})
		builder.addCase(deleteAdminUser.fulfilled, (state, action) => {
			state.users = state.users.filter(
				item => item.id !== action.payload.record.id
			)

			state.isFetching = false
			state.message = null
		})
		builder.addCase(deleteAdminUser.rejected, state => {
			state.message = ERROR
			state.isFetching = false
		})

		//deleteAdminUsers
		builder.addCase(deleteAdminUsers.pending, state => {
			state.isFetching = true
			state.message = null
		})
		builder.addCase(deleteAdminUsers.fulfilled, (state, action) => {
			console.log(action.payload.record)
			state.users = state.users.filter(row => {
				return !action.payload.record.some(rowResp => {
					return rowResp.id === row.id
				})
			})
			state.isFetching = false
			state.message = null
		})
		builder.addCase(deleteAdminUsers.rejected, state => {
			state.message = ERROR
			state.isFetching = false
		})

		//getAdminLogin
		builder.addCase(getAdminLogin.pending, state => {
			state.isFetching = true
			state.message = null
		})
		builder.addCase(getAdminLogin.fulfilled, (state, action) => {
			state.usersLogin = action.payload?.response
			state.isFetching = false
			state.message = null
		})
		builder.addCase(getAdminLogin.rejected, state => {
			state.message = ERROR
			state.isFetching = false
		})
	},
})

export const {} = adminUsersReducer.actions

export default adminUsersReducer.reducer

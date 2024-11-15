import { configureStore } from '@reduxjs/toolkit'
import adminBxSlice from '../slices/adminBxSlice/adminBxSlice'
import adminClientsReducer from '../slices/adminClientsSlice/adminClientsSlice'
import adminLoginsReducer from '../slices/adminLoginSlice/adminLoginSlice'
import adminUsersReducer from '../slices/adminUsersSlice/adminUsersSlice'

export const store = configureStore({
	reducer: {
		clients: adminClientsReducer,
		users: adminUsersReducer,
		logins: adminLoginsReducer,
		bx: adminBxSlice,
	},
})

import { configureStore } from '@reduxjs/toolkit'
import adminClientsReducer from '../slices/adminClientsSlice/adminClientsSlice'
import adminUsersReducer from '../slices/adminUsersSlice/adminUsersSlice'

export const store = configureStore({
	reducer: {
		clients: adminClientsReducer,
		users: adminUsersReducer,
	},
})

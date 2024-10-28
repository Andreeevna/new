import { configureStore } from '@reduxjs/toolkit'
import adminGetReducer from '../slices/adminGetSlice/adminGetReducer'

export const store = configureStore({
	reducer: {
		incom: adminGetReducer,
	},
})

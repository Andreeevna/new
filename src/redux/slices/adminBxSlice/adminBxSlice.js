import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	userId: null,
	initials: {},
	message: null,
	isFetching: false,
}
export const adminBxSlice = createSlice({
	name: 'bx',
	initialState,
	reducers: {
		changeUserId: (state, action) => {
			state.userId = action.payload
		},
		changeUserInitials: (state, action) => {
			state.userId = action.payload
		},
	},
	extraReducers: builder => {},
})

export const { changeUserId, changeUserInitials } = adminBxSlice.actions

export default adminBxSlice.reducer

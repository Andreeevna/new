import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getClients = createAsyncThunk('incom/getClients', async params => {
	const { fileId, bxID } = params
	try {
		// const { data } = await fileAPI.getOneFileInfo(fileId, bxID)
		return data
	} catch (error) {
		console.error('Ошибка при получении клиентов', error)
		throw error.response.status
	}
})

const initialState = {
	data: null,
}
export const adminGetReducer = createSlice({
	name: 'incom',
	initialState,
	reducers: {},
	extraReducers: builder => {
		// getClients
		builder.addCase(getClients.pending, state => {})
		builder.addCase(getClients.fulfilled, (state, action) => {
			console.log(action.getClients)
		})
		builder.addCase(getClients.rejected, state => {})
	},
})

export const {} = adminGetReducer.actions

export default adminGetReducer.reducer

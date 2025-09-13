import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogedIn: false,
    user: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.isLogedIn = true
        },
        removeUser: (state) => {
            state.user = {}
            state.isLogedIn = false
        }
    }
})

// Action creators are generated for each case reducer function
export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
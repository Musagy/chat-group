import { createSlice } from "@reduxjs/toolkit"
import { Auth, AuthState } from "./authSliceTypes"

const initialState: Auth = {
  isStateInitialized: false,
  token: null,
  user: null,
}
const nullifyValues = (state: Auth) => {
  state.user = null
  state.token = null
  if (!state.isStateInitialized) state.isStateInitialized = true
}
const setValues = (state: Auth, values: Auth) => {
  state.token = values.token
  state.user = values.user
  if (!state.isStateInitialized) state.isStateInitialized = true
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadAuthSaved: state => {
      const auth = localStorage.getItem("auth")
      if (!auth) nullifyValues(state)
      else setValues(state, JSON.parse(auth))
    },
    setCredentials: (state, { payload }) => {
      localStorage.setItem("auth", JSON.stringify(payload))
      setValues(state, payload)
    },
    logOut: state => {
      localStorage.removeItem("auth")
      nullifyValues(state)
    },
    updateToken: (state, { payload }) => {
      const authString = localStorage.getItem("auth")
      if (!authString) return
      const newToken = payload.token as string
      const auth = JSON.parse(authString) as Auth
      state.token = newToken
      auth.token = newToken
      localStorage.setItem("auth", JSON.stringify(auth))
    },
  },
})

export const { setCredentials, logOut, loadAuthSaved, updateToken } =
  authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: AuthState) => state.auth.user
export const selectCurrentToken = (state: AuthState) => state.auth.token
export const selectIsStateInitialized = (state: AuthState) =>
  state.auth.isStateInitialized

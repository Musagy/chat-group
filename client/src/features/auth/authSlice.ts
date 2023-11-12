import { createSlice } from "@reduxjs/toolkit"
import { Auth, AuthState } from "./authSliceTypes"

const initialState: Auth = {
  user: null,
  token: null,
}
// {
//   token:
//     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJNdXNhZ3kiLCJyb2xlcyI6IlVTRVIiLCJpc3MiOiJNdXNhZ3kgZGV2IiwiZXhwIjoxNjk5MTMwNDk4LCJ1c2VySWQiOjJ9.UoeFmBoVNnuMgex7aa9EnZ_3vVz9M9YS5ST5QEhROlI",
//   user: {
//     id: 2,
//     username: "Musagy",
//     userAlias: "Diego Musagy",
//     role: "USER",
//   },
// }

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadAuthSaved: state => {
      const auth = localStorage.getItem("auth")
      if (!auth) return

      const { token, user } = JSON.parse(auth) as Auth

      state.user = user
      state.token = token
    },
    setCredentials: (state, { payload }) => {
      const { user, token } = payload as Auth
      localStorage.setItem("auth", JSON.stringify(payload))
      state.user = user
      state.token = token
    },
    logOut: state => {
      localStorage.removeItem("auth")
      state.user = null
      state.token = null
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

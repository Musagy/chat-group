import { createSlice } from "@reduxjs/toolkit"
import { Auth, AuthState, ChatHistory } from "./authSliceTypes"

const initialState: Auth = {
  isStateInitialized: false,
  token: null,
  user: null,
  chatsHistory: [],
  pfpBgColor: 0,
}
const nullifyValues = (state: Auth) => {
  state.user = null
  state.token = null
  state.chatsHistory = null
  if (!state.isStateInitialized) state.isStateInitialized = true
}
const setValues = (state: Auth, values: Auth) => {
  state.token = values.token
  state.user = values.user
  state.chatsHistory = values.chatsHistory
  state.pfpBgColor = Math.floor(Math.random() * 10)
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
      setValues(state, { ...payload, chatsHistory: null })
    },
    logOut: state => {
      localStorage.removeItem("auth")
      nullifyValues(state)
    },
    updateToken: (state, { payload }: { payload: Auth }) => {
      const authString = localStorage.getItem("auth")
      if (!authString) return
      const newToken = payload.token
      const auth = JSON.parse(authString) as Auth
      state.token = newToken
      auth.token = newToken
      localStorage.setItem("auth", JSON.stringify(auth))
    },
    setNewChatInHistory: (
      state,
      { payload }: { payload: { newChatHistory: ChatHistory } }
    ) => {
      const authString = localStorage.getItem("auth")
      if (!authString) return

      const newChatHistory = payload.newChatHistory
      const auth = JSON.parse(authString) as Auth

      state.chatsHistory = [
        ...(state.chatsHistory
          ? state.chatsHistory.filter(v => v[0] !== newChatHistory[0])
          : []),
        newChatHistory,
      ].splice(0, 10)
      auth.chatsHistory = state.chatsHistory

      localStorage.setItem("auth", JSON.stringify(auth))
    },
  },
})

export const {
  setCredentials,
  logOut,
  loadAuthSaved,
  updateToken,
  setNewChatInHistory,
} = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: AuthState) => state.auth.user
export const selectCurrentToken = (state: AuthState) => state.auth.token
export const selectChatsHistory = (state: AuthState) => state.auth.chatsHistory
export const selectPfpBgColor = (state: AuthState) => state.auth.pfpBgColor
export const selectIsStateInitialized = (state: AuthState) =>
  state.auth.isStateInitialized

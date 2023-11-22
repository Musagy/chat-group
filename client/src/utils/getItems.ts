import { store } from "../features/store"

export const API = import.meta.env.API_URL ?? "http://localhost:8080"
export const APIForWS = import.meta.env.API_URL_WS ?? "//localhost:8080/msg"

export const getAuthHeader = () => {
  const state = store.getState()
  const token = state.auth.token

  return { Authorization: "Bearer " + token }
}

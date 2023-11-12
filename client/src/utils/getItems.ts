import { store } from "../features/store"

export const API = import.meta.env.API_URL ?? "http://localhost:8080"

export const getAuthHeader = () => {
  const state = store.getState()
  const token = state.auth.token

  return { Authorization: "Bearer " + token }
}

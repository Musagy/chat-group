import { SignInReq, SignUpReq } from "../models/Requests"
import { API, getAuthHeader } from "../utils/getItems"

export const signInRequest = async (formData: SignInReq) => {
  const res = await fetch("http://localhost:8080/auth/sign-in", {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    method: "POST",
  }).then(res => res.json())
  return res
}

export const signUpRequest = async (formData: SignUpReq) => {
  const res = await fetch("http://localhost:8080/auth/sign-up", {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    method: "POST",
  }).then(res => res.json())
  return res
}

export const tokenValidate = async () => {
  const getAuth = getAuthHeader()
  const res = await fetch(`${API}/auth/validate`, {
    headers: getAuth,
  }).then(data => data.json())
  return res
}

import Form, { Field } from "../components/Form"
import { useState } from "react"
import { SignInReq, SignUpAndSignInResponse } from "../models/Requests"
import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { setCredentials } from "../features/auth/authSlice"
import useChangeTitle from "../hooks/useChangeTitle"
import { useNavigate } from "react-router-dom"

const signInRequest = async (formData: SignInReq) => {
  const res = await fetch("http://localhost:8080/auth/sign-in", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    method: "POST",
  }).then(res => res.json())
  return res
}

const SignIn = () => {
  useChangeTitle("Inicio de sesión")

  // Creación de estados de los campos
  const [formData, setFormData] = useState<SignInReq>({
    usernameOrEmail: "",
    password: "",
  })

  const SignInFields: Field[] = [
    {
      id: "Username o Email",
      setState: e =>
        setFormData({ ...formData, usernameOrEmail: e.target.value }),
      state: formData.usernameOrEmail,
      type: "text",
    },
    {
      id: "Contraseña",
      setState: e => setFormData({ ...formData, password: e.target.value }),
      state: formData.password,
      type: "password",
    },
  ]

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signInMutation = useMutation({
    mutationFn: signInRequest,
    onError: error => console.error("rejected", error),
    onSuccess: (data: SignUpAndSignInResponse) => {
      dispatch(setCredentials(data))
      navigate("/")
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signInMutation.mutate(formData)
  }

  return (
    <Form
      title="Inicio de Sección"
      textSubmit="Ingresar"
      handleSubmit={handleSubmit}
      fields={SignInFields}
    />
  )
}

export default SignIn

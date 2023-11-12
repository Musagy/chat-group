import Form, { Field } from "../components/Form"
import { useEffect, useState } from "react"
import { Email, SignUpAndSignInResponse, SignUpReq } from "../models/Requests"
import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { setCredentials } from "../features/auth/authSlice"
import useChangeTitle from "../hooks/useChangeTitle"
import { useNavigate } from "react-router-dom"
import { signUpRequest } from "../api/authRequest"

const SignUp = () => {
  useChangeTitle("Inicio de sesión")

  // Creación de estados de los campos
  const [formData, setFormData] = useState<SignUpReq>({
    email: "" as Email,
    userAlias: "",
    username: "",
    password: "",
  })
  const [confirmPassword, setConfirmPassword] = useState("")

  const SignInFields: Field[] = [
    {
      id: "Email",
      setState: e =>
        setFormData({ ...formData, email: e.target.value as Email }),
      state: formData.email,
      type: "email",
    },
    {
      id: "Username",
      setState: e => setFormData({ ...formData, username: e.target.value }),
      state: formData.username,
      type: "text",
    },
    {
      id: "Nickname",
      setState: e => setFormData({ ...formData, userAlias: e.target.value }),
      state: formData.userAlias,
      type: "text",
    },
    {
      id: "Contraseña",
      setState: e => setFormData({ ...formData, password: e.target.value }),
      state: formData.password,
      type: "password",
    },
    {
      id: "Confirmar contraseña",
      setState: e => setConfirmPassword(e.target.value),
      state: confirmPassword,
      type: "password",
    },
  ]

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { mutate, error } = useMutation({
    mutationFn: signUpRequest,
    onError: error => console.error("rejected", error),
    onSuccess: (data: SignUpAndSignInResponse) => {
      dispatch(setCredentials(data))
      navigate("/")
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.password !== confirmPassword)
      alert("la contraseña no es la misma")
    else mutate(formData)
  }

  useEffect(() => {
    if (error) alert(error)
  }, [error])

  return (
    <Form
      title="Crear cuenta"
      textSubmit="Registrarse"
      handleSubmit={handleSubmit}
      fields={SignInFields}
    />
  )
}

export default SignUp

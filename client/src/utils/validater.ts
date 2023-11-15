export function validateFormField<T>(form: T): boolean {
  let isValid = true
  Object.entries(form as { [key: string]: string }).forEach(([k, v]) => {
    if (!v) {
      alert(k + " esta vació")
      isValid = false
    }
  })
  return isValid
}

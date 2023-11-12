export const getInitials = (text: string) => {
  const words = text.split(" ").slice(0, 2)
  let result = ""

  words.forEach(word => {
    if (/^[a-zA-Z]/.test(word)) {
      result += word[0].toUpperCase()
    }
  })

  return result
}

export function createChanger<T>(
  formData: T,
  setFormData: React.Dispatch<React.SetStateAction<T>>,
  fieldsMaxChars: { [K in keyof T]: number },
  alternativeFieldName: { [K in keyof T]?: string } = {}
) {
  const changers: {
    [K in keyof T]?: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
  } = {}

  Object.entries<number>(fieldsMaxChars).forEach(([key, value]) => {
    const fieldKey = key as keyof T
    if (typeof formData[fieldKey] === "string") {
      const changer = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        if (e.target.value.length <= value)
          setFormData({ ...formData, [key]: e.target.value })
        else
          alert(
            `El ${
              alternativeFieldName[fieldKey] === null ?? fieldKey
            } debe tener como máximo ${value} caracteres.... Por favor. 😀`
          )
      }
      changers[fieldKey] = changer
    }
  })
  return changers
}

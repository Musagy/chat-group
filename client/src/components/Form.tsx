import { ChangeEvent, FormEvent, Fragment, HTMLInputTypeAttribute } from "react"

export interface Field {
  id: string
  type: HTMLInputTypeAttribute
  state: string | number | readonly string[] | undefined
  setState: (event: ChangeEvent<HTMLInputElement>) => void
}
interface Props {
  title: string
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  textSubmit: string
  fields: Field[]
}

const Form = ({ title, handleSubmit, fields, textSubmit }: Props) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-gray">{title}</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col 
      bg-aside_bg px-5 py-4 rounded-lg gap-1"
      >
        {fields.map(field => {
          return (
            <Fragment key={field.id}>
              <label htmlFor={field.id} className="text-sm text-gray">
                {field.id}:
              </label>
              <input
                type={field.type}
                id={field.id}
                value={field.state}
                onChange={field.setState}
                required
                className="px-2 py-0.5 rounded mb-2 placeholder:text-msg_placeholder bg-msg_input"
                placeholder={field.id}
              />
            </Fragment>
          )
        })}
        <button
          className="bg-gray hover:bg-msg_placeholder
        text-chat_bg font-bold self-center
          px-3 py-0.5 mt-1 rounded"
        >
          {textSubmit}
        </button>
      </form>
    </>
  )
}

export default Form

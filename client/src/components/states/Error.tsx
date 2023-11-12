import { DefaultError } from "@tanstack/react-query"

interface Props {
  err: DefaultError
}

const Error = ({ err }: Props) => <div>Error: {err.message}</div>

export default Error

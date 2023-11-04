import useChangeTitle from "../hooks/useChangeTitle"

const NotFound = () => {
  useChangeTitle("No existe")
  return <div>NotFound</div>
}

export default NotFound

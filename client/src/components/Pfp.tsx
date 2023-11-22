import { getInitials } from "../utils/formatters"

interface Props {
  name: string
  className: string
}

const Pfp = ({ name, className }: Props) => {
  const pfp = getInitials(name)
  return (
    <picture
      className={`font-bold h-[42px] w-[42px] grid place-items-center text-2xl rounded-lg ${className}`}
    >
      {pfp}
    </picture>
  )
}

export default Pfp

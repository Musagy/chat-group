import { ReactNode } from "react"

export type Page = {
  id: string
  text: string
  route: string
  element: ReactNode
}
import { useDocumentTitle } from "usehooks-ts"

const useChangeTitle = (title: string) => {
  const currentPageTitle = title || "No Existe"
  useDocumentTitle(`${currentPageTitle} | Chat Grupal`)
}
export default useChangeTitle

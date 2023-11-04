import Layout from "../Layouts/Layout"
import useChangeTitle from "../hooks/useChangeTitle"

const Home = () => {
  useChangeTitle("Inicio")
  return (
    <Layout>
      <div>Hola chupapis</div>
    </Layout>
  )
}

export default Home

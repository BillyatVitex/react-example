import Navbar from '../molecules/Navbar'
import Footer from '../molecules/Footer'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />

      <main>{children}</main>
      <Footer />
    </>
  )
}
import Navbar from '../molecules/Navmenu'
import Footer from '../molecules/Footer'
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import SideMenu from '../molecules/SideMenu';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <SideMenu />
      <main>{children}</main>
      <Footer />
    </>
  )
}
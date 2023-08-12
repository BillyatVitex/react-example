import Navbar from '@/app/molecules/Headermenu'
import Footer from '@/app/molecules/Footer'
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import SideMenu from '@/app/molecules/SideMenu';
import { Container, Col, Row } from 'react-bootstrap';
import styles from '@/styles/global.scss'

export default function Layout({ children }) {
  return (
    <>
      <Container fluid>

        <Navbar />
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <SideMenu />
          </Col>
          <Col xs={10} id="page-content-wrapper">
            <main>{children}</main>
          </Col>
        </Row>
        <Footer />
      </Container>
    </>
  )
}
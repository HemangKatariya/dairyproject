import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "./images/logo.png"
import { Link } from 'react-router-dom';
import logo2 from "./images/Bapa Sitaram Dairy-logos_black2.png"


function Navv() {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home"><img src={logo2} alt="" className='img-fluid' style={{ height: '70px' }} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav " />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/Products">Products</Nav.Link>
                        <NavDropdown title="Login" className='me-5' id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/Login">Customer Login</NavDropdown.Item>
                            {/* <NavDropdown.Item as={Link} to="/AddCustomer">
                                Add Customer
                            </NavDropdown.Item> */}
                            <NavDropdown.Item as={Link} to="/OwnerLogin">
                                Owner Login
                            </NavDropdown.Item>



                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navv;
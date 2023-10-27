import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "./images/Bapa Sitaram Dairy-logos_black2.png"
import { Link } from 'react-router-dom';

function Navv() {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                {/* <Navbar.Brand href="/home"><h3>Bapa Sitaram Dairy</h3></Navbar.Brand> */}
                <Navbar.Brand href="/home"><img src={logo} alt="Logo" className='img-fluid' style={{ height: '80px' }} /></Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav " />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/CustomerDataBase">Home</Nav.Link>
                        <Nav.Link href="/Sales">Sales</Nav.Link>

                        <NavDropdown title="Other Actions" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/AddCustomer">Add Customar</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/WholesaleBill">Wholesale Bill</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/TodaySales">Today's Sales</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/Payment">Payment Status</NavDropdown.Item>
                        </NavDropdown>
                        {/* <NavDropdown.Item as={Link} >
                            <NavDropdown title="Change Language" id="collasible-nav-dropdown">
                                <NavDropdown.Item >English</NavDropdown.Item>
                                <NavDropdown.Item>Hindi</NavDropdown.Item>
                                <NavDropdown.Item >Gujarati</NavDropdown.Item>
                            </NavDropdown>
                        </NavDropdown.Item> */}
                        <Nav.Link href="/Home">Dashboard</Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Navv;
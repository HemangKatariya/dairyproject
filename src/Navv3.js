import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import logo from "./images/Bapa Sitaram Dairy-logos_black2.png"



function Navv3() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");

        if (confirmLogout) {
            toast.warn('Logging Out...');
            await new Promise(resolve => setTimeout(resolve, 3650));
            localStorage.removeItem('loggedInUser')
            navigate('/login');
        }
    };

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/home"><img src={logo} alt="Logo" className='img-fluid' style={{ height: '80px' }} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav " />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <ToastContainer />
        </Navbar>
    );
}

export default Navv3;

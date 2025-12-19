import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import formatCurrency from '../utils/price';

function Navbar1(){
    const { total } = useContext(CartContext);
    const { isLoggedIn, handleLogout } = useContext(UserContext);
    return(
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand
                        as={NavLink}
                        to="/"
                        className={({ isActive }) => (isActive ? 'active-link' : undefined)}
                    >
                        Pizzeria Mamma Mia
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav className='boxMenu'>
                            <Nav.Link as={NavLink} to="/" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>🍕 Home</Nav.Link>
                        </Nav>                        
                        {isLoggedIn ? 
                        <Nav>
                            <Nav className='boxMenu'>
                                <Nav.Link as={NavLink} to="/profile" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>🔓 Profile</Nav.Link>
                            </Nav>
                            <Nav className='boxMenu'>
                                <Nav.Link as={NavLink} to="/" onClick={handleLogout} className={({ isActive }) => (isActive ? 'active-link' : undefined)}>🔒 Logout</Nav.Link>
                            </Nav>
                        </Nav>
                        :
                        <Nav>
                            <Nav className='boxMenu'>
                                <Nav.Link as={NavLink} to="/login" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>🔐 Login</Nav.Link>
                            </Nav>                  
                            <Nav className='boxMenu'>
                                <Nav.Link as={NavLink} to="/register" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>🔐 Register</Nav.Link>                                
                            </Nav>  
                        </Nav> 
                        }    
                                                                     
                    </Nav>
                    <Nav className='boxTotal'>
                        <Nav.Link as={NavLink} to="/cart" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>{`🛒 Total: ${formatCurrency(total)}`}</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Navbar1;
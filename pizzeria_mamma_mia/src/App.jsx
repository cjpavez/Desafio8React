// import './App.css'
import { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar1 from './components/Navbar'
import Home from './pages/Home';
import Pizzas from './pages/Pizza';
import Footer from './components/Footer'
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import CartProvider from './context/CartContext';
import PizzasProvider from './context/PizzasContext';
import UserProvider, { UserContext } from './context/UserContext';

import { Routes, Route, Navigate } from 'react-router-dom';

function AppRoutes() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Routes>
      <Route
        path='/'
        element={<Home />}
      />
      <Route
        path='/register'
        element={<Register />}
      />
      <Route
        path='/login'
        element={<Login />}
      />
      <Route
        path='/cart'
        element={<Cart />}
      />
      <Route
        path='/pizza/:id'
        element={<Pizzas/>}
      />
      <Route
        path='/profile'
        element={isLoggedIn ? <Profile/> : <Navigate to="/login" replace />}
      />
      <Route
        path='*'
        element={<NotFound/>}
      />
    </Routes>
  );
}

function App() {
  return (
    <UserProvider>
      <PizzasProvider>
        <CartProvider>
          <div className='conteiner'>
            <div>
              <Navbar1 />
            </div>        
            <AppRoutes />
            <div>
              <Footer/>
            </div>
          </div>
        </CartProvider>
      </PizzasProvider>
    </UserProvider>
  );
};

export default App;

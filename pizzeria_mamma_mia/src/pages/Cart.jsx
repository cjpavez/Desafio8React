import { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import SelectPizza from "../components/SelectPizza";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import formatCurrency from '../utils/price';

function Cart() {
    const { cart, onIncrease, onDecrease, clearCart } = useContext(CartContext);
    const { token, isLoggedIn } = useContext(UserContext);
    const total = cart.reduce((sum, p) => sum + (Number(p.price) * Number(p.count || 0)), 0);

    const [loading, setLoading] = useState(false);
    const [checkoutError, setCheckoutError] = useState(null);
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);

    const handleCheckout = async () => {
        try {
            setLoading(true);
            setCheckoutError(null);
            setCheckoutSuccess(false);

            const response = await fetch('http://localhost:5000/api/checkouts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ cart, total }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al procesar el checkout');
            }

            await response.json();
            setCheckoutSuccess(true);
            clearCart();
        } catch (err) {
            setCheckoutError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return(
        <>
            <div className="cartPizzas">
                <h4>Detalles del pedido</h4>
                <div>
                    {cart.map((item) => (
                        <SelectPizza 
                            key={item.id}
                            idn={item.id}
                            nombre={item.name}
                            precio={item.price}
                            cantidad={item.count}
                            imagen={item.img}
                            onIncrease={() => onIncrease(item.id)}
                            onDecrease={() => onDecrease(item.id)}
                        />
                    ))}  
                </div>        
                <h3>{`Total: ${formatCurrency(total)}`}</h3>
                <button
                    className="cartPagar"
                    onClick={handleCheckout}
                    disabled={!isLoggedIn || loading || cart.length === 0}
                    title={!isLoggedIn ? 'Debes iniciar sesión para pagar' : ''}
                >
                    {loading ? 'Procesando...' : 'Pagar'}
                </button>
                {checkoutSuccess && (
                    <p style={{ color: 'green', marginTop: '10px' }}>¡Se ha realizado el pago correctamente!</p>
                )}
                {checkoutError && (
                    <p className='error' style={{ marginTop: '10px' }}>{checkoutError}</p>
                )}
                {!isLoggedIn && (
                    <p style={{ marginTop: '10px' }}>
                        Debes iniciar sesión para poder pagar. <Link to="/login">Entrar</Link> o <Link to="/register">Regístrate</Link>
                    </p>
                )}
            </div>
        </>        
    );    
};

export default Cart;
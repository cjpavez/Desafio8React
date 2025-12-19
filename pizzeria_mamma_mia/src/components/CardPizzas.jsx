import { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import formatCurrency from '../utils/price';

function CardPizza({id, nombre, precio, ingredientes, img}) {
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = () => {
        const pizza = { id, name: nombre, price: precio, ingredients: ingredientes, img };
        addToCart(pizza);
    };
    const capitalize = (str) => {
        if (!str && str !== 0) return '';
        return String(str)
            .trim()
            .split(' ')
            .map((w) => (w.length ? w.charAt(0).toUpperCase() + w.slice(1) : w))
            .join(' ');
    };

    const capitalizeFirst = (s) => {
        if (!s && s !== 0) return '';
        const str = String(s).trim();
        return str.length ? str.charAt(0).toUpperCase() + str.slice(1) : '';
    };

    return (
        <Card className='cardPizzas'>
            <Card.Img variant="top" src={img}/>
            <Card.Body>
                    <Card.Title style={{ fontSize: 'x-large' }}><strong>{capitalizeFirst(nombre)}</strong></Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 'large' }}>Ingredientes</p>
                    <ul className='listaIngredientes'>
                        {ingredientes.map((ingredientes, key) => (<li key={key} style={{ fontSize: 'large' }}>🍕 {capitalize(ingredientes)}</li>))}
                    </ul>
                </ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Card.Title style={{ marginBottom: '30px', textAlign: 'center' }}>{`Precio: ${formatCurrency(precio)}`}</Card.Title>
                <Card.Title className='btnCarrito'>
                    <Link to={`/pizza/${id}`}>
                        <Button variant="light">Ver Más <i className="em em-eyes" aria-role="presentation" aria-label="EYES"></i></Button>
                    </Link>
                    <Button variant="dark" onClick={handleAddToCart}>Añadir 🛒</Button>
                </Card.Title>           
            </Card.Body>
        </Card>    
  );
};

export default CardPizza;
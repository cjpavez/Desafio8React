import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { UserContext } from '../context/UserContext';

function Profile(){
    const { usuarioRegistrado, email, profile, handleLogout } = useContext(UserContext);
    const userEmail = (profile && profile.email) || email || usuarioRegistrado || 'No registrado';

    return(
        <Card className='perfilUsuario'>
            <Card.Header as="h5">Perfil Usuario</Card.Header>
            <Card.Body>
                <Card.Text>{`Correo: ${userEmail}`}</Card.Text>
                <Button variant="primary" onClick={handleLogout}>Cerrar Sesión</Button>
            </Card.Body>
        </Card>
    );
};

export default Profile;
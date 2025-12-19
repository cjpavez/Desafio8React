import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { UserContext } from '../context/UserContext';

function Login() {
  const { handleLogin } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const location = useLocation();
  const registroExitoso = location.state?.registered === true;
  const navigate = useNavigate();
  
  const [error, setError] = useState(false);
  const [error3, setError3] = useState(false);
  const [errorCredenciales, setErrorCredenciales] = useState(false);
  const [exito, setExito] = useState(false);

    const validarDatos = async (e) => {
        e.preventDefault();

        if(!email.trim() || !contraseña.trim()){
            setError(true);
            return;
        }

        if(contraseña.length <= 6){
          setError3(true);
          return;
        }

        setError(false);
        setError3(false);
        setErrorCredenciales(false);

        try {
          await handleLogin(email, contraseña);
          setExito(true);
          setEmail("");
          setContraseña("");
          navigate('/profile');
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
          setErrorCredenciales(true);
        }
    };

    useEffect(() => {
        if (contraseña.length > 0 && contraseña.length <= 6) {
            setError3(true);
        } else {
            setError3(false);
        }
    }, [contraseña]);


  return (
    <div className='formCenter'>
      <Form className='formulario' onSubmit={validarDatos}>
        <h2>Login</h2>
        {registroExitoso ? <p style={{ color: 'green' }}>Registro exitoso, por favor ingresa tus credenciales.</p> : null}
        {exito ? <p style={{ color: 'green' }}>¡Login exitoso!</p> : null}
        {error ? <p className='error'>Todos los campos son obligatorios</p> : null}
        {errorCredenciales ? <p className='error'>Email o contraseña incorrectos</p> : null}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Dirección email</Form.Label>
          <Form.Control type="email" placeholder="Ingresa tu email" onChange={(e) => setEmail(e.target.value)} value={email}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Ingresa tu contraseña" onChange={(e) => setContraseña(e.target.value)} value={contraseña}/>
          {error3 ? <p className='error'>La contraseña debe tener al menos 6 caracteres</p> : null}
        </Form.Group>

        <Button variant="primary" type="submit">
          Entrar
        </Button>
      </Form>
    </div>    
  );
};

export default Login;
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { UserContext } from '../context/UserContext';

function Register() {
  const { handleRegister } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [contraseña2, setContraseña2] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const [errorRegistro, setErrorRegistro] = useState(null);
  const [exito, setExito] = useState(false);

    const validarDatos = async (e) => {
        e.preventDefault();

        if(!email.trim() || !contraseña.trim() || !contraseña2.trim()){
            setError(true);
            return;
        }
        if(contraseña.trim() !== contraseña2.trim()){
            setError2(true);
            return;
        }
        if(contraseña.length <= 6){
          setError3(true);
          return;
        }

        setError(false);
        setError2(false);
        setError3(false);
        setErrorRegistro(null);

        try {
          await handleRegister(email, contraseña);
          setExito(true);
          setEmail("");
          setContraseña("");
          setContraseña2("");
          navigate('/login', { state: { registered: true } });
        } catch (err) {
          console.error('Registro fallido:', err);
          setErrorRegistro(err.message || 'Error al registrarse');
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
        <h2>Registro</h2>
        {exito ? <p style={{ color: 'green' }}>¡Registro exitoso!</p> : null}
        {error ? <p className='error'>Todos los campos son obligatorios</p> : null}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Dirección email</Form.Label>
          <Form.Control type="email" placeholder="Ingresa tu email para registrarte" onChange={(e) => setEmail(e.target.value)} value={email}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Ingresa tu contraseña" onChange={(e) => setContraseña(e.target.value)} value={contraseña}/>
          {error3 ? <p className='error'>La contraseña debe tener al menos 6 caracteres</p> : null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Repita su contraseña" onChange={(e) => setContraseña2(e.target.value)} value={contraseña2}/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>
        {error2 ? <p className='error'>¡Las contraseñas no coinciden!</p> : null}
        {errorRegistro ? <p className='error'>{errorRegistro}</p> : null}

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </div>    
  );
};

export default Register;
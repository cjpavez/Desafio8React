function SelectPizza({idn, nombre, precio, cantidad, imagen, onIncrease, onDecrease}) {
    const count = Number(cantidad) || 0;
   
    return (
        <div className="selectPizza" key={idn}>
            {count <=0 ? '' :   
                <div className='clasePizza'>
                    <img style={{ height: '40px' }} src={imagen} alt="imagen de pizza"/>
                    <p style={{ width: '150px', marginLeft: '10px' }}>{nombre}</p>
                    <p style={{ width: '70px' }}>${precio}</p>
                    <button className="btnMenos" onClick={onDecrease} aria-label={`Disminuir ${nombre}`}>-</button>
                    <p>{count}</p>
                    <button className="btnMas" onClick={onIncrease} aria-label={`Aumentar ${nombre}`}>+</button>
                </div>
            }            
        </div>
    );
};

export default SelectPizza;
import CardPizza from "../components/CardPizzas";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PizzasContext } from "../context/PizzasContext";

function Pizzas(){
    const { id } = useParams();
    const { selectedPizza, consultarApiById } = useContext(PizzasContext);

    useEffect(() => {
        if (id) {
            consultarApiById(id);
        }
    }, [id, consultarApiById]);

    return(
        <>
            <div className="pizzas">
                {selectedPizza && (
                    <CardPizza 
                        key={selectedPizza.id}
                        id={selectedPizza.id}
                        nombre={selectedPizza.name}
                        precio={selectedPizza.price}
                        ingredientes={selectedPizza.ingredients}
                        img={selectedPizza.img}
                    />
                )}
            </div>            
        </>
    );
};

export default Pizzas;
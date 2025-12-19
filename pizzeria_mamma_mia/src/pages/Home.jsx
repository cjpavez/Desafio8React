import Titulo from "../components/Header";
import CardPizza from "../components/CardPizzas";
import { useContext, useEffect } from "react";
import { PizzasContext } from "../context/PizzasContext";

function Home() {
    const { pizzas, consultarApiAll } = useContext(PizzasContext);

    useEffect(() => {
        consultarApiAll();
    }, [consultarApiAll]);

    return(
        <>
            <div className="home">
                <Titulo/>
            </div>
            <div className="pizzas">
                {pizzas.map((pizza) => (
                    <CardPizza 
                        key={pizza.id}
                        id={pizza.id}
                        nombre={pizza.name}
                        precio={pizza.price}
                        ingredientes={pizza.ingredients}
                        img={pizza.img}
                    />
                ))}
            </div>            
        </>
    );
};

export default Home;
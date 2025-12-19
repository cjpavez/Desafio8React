import { createContext, useState } from "react";


// eslint-disable-next-line react-refresh/only-export-components
export const PizzasContext = createContext();

export const PizzasProvider = ({children}) => {
    const [pizzas, setPizzas] = useState([]);
    const [selectedPizza, setSelectedPizza] = useState(null);

    const consultarApiAll = async () => {
        try {
            const url = "http://localhost:5000/api/pizzas";
            const response = await fetch(url);
            const data = await response.json();
            console.log("Datos del API:", data);
            setPizzas(data);
        } catch (error) {
            console.error("Error al obtener pizzas:", error);
        }
    };

    const consultarApiById = async (id) => {
        try {
            const url = `http://localhost:5000/api/pizzas/${id}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log("Datos del API:", data);
            setSelectedPizza(data);
        } catch (error) {
            console.error("Error al obtener pizza:", error);
        }
    };

    return(
        <PizzasContext.Provider value={{ pizzas, selectedPizza, consultarApiAll, consultarApiById }}>
            {children}
        </PizzasContext.Provider>
    );
};

export default PizzasProvider;
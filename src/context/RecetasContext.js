import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    const [ recetas, setRecetas ] = useState([]);
    const [ consultar, setConsultar ] = useState(false);
    const [ busqueda, setBusqueda ] = useState({
        ingrediente: '',
        categoria: ''
    });

    useEffect(() => {
        const { ingrediente, categoria } = busqueda;

        if (consultar) {
            const consultaReceta = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}&c=${categoria}`;
                try {
                    const result = await axios.get(url);
                    setRecetas(result.data.drinks);
                } catch (error) {}
            }
            if (ingrediente.trim()==='' || categoria.trim()==='') return;
            consultaReceta();
            setConsultar(false);
        }
        // eslint-disable-next-line
    }, [busqueda])

    return(
        <RecetasContext.Provider
            value={{ 
                recetas,
                setBusqueda,
                setConsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    )
}

export default RecetasProvider;
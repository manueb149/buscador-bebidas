import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CategoriasContext = createContext();

const CategoriasProvider = (props) => {

    const [ categories, setCategories] = useState([]);

    useEffect(() => {
        const consultarCat = async () => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
            try {
                const result = await axios.get(url);
                setCategories(result.data.drinks);
            } catch (error) {}
        }
        consultarCat();
    }, []);

    return(
        <CategoriasContext.Provider
            value={{ categories }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )

}

export default CategoriasProvider;
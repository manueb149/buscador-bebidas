import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {

    const [ idReceta, setIdReceta ] = useState(null); 
    const [ recetaBebida, setRecetaBebida ] = useState({});

    useEffect(() => {
        if (!idReceta) return;
        const consultarReceta = async () => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;
            try{
                const result = await axios.get(url);
                setRecetaBebida(result.data.drinks[0]);
            }catch (error) {}
        }
        consultarReceta();
    },[idReceta])

    return(
        <ModalContext.Provider
            value={{
                recetaBebida,
                setIdReceta,
                setRecetaBebida
            }}
        >
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalProvider;
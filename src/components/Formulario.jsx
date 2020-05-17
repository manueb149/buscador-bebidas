import React, { useState, useContext } from 'react';

import { CategoriasContext } from '../context/CategoriasContext';
import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {

    const { categories } = useContext(CategoriasContext);
    const { setBusqueda, setConsultar } = useContext(RecetasContext);

    const [ form, setForm ] = useState({
        ingrediente: '',
        categoria: ''
    })

    const { ingrediente, categoria } = form;

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (ingrediente.trim() === '' || categoria.trim() === ''){
            return;
        }
        setBusqueda(form);
        setConsultar(true);
    }

    return ( 
        <form 
            className="col-12"
            onSubmit={handleSubmit}
        >
            <fieldset className="text-center mb-2">
                <legend>Busca bebidas por categoría o ingrediente</legend>
            </fieldset>
            <div className="row">
                <div className="col-md-4 mt-4">
                    <input 
                        type="text"
                        className="form-control"
                        name="ingrediente"
                        placeholder="Buscar por Ingrediente"
                        value={ingrediente}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-4 mt-4">
                    <select 
                        className="form-control"
                        name="categoria"
                        value={categoria}
                        onChange={handleChange}
                    >
                        <option value="">-- Selecciona categoría --</option>
                        {categories.map(category => (
                            <option 
                                key={category.strCategory}
                                value={category.strCategory}
                            >{category.strCategory}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4 mt-4">
                    <button
                        type="submit"
                        className="btn btn-block btn-primary"
                    >Buscar Bebida</button>
                </div>
            </div>
        </form>
    );
}
 
export default Formulario;
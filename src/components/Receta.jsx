import React, {useContext, useState} from 'react';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

import { ModalContext } from '../context/ModalContext';

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const useStyles = makeStyles((theme) => ({
paper: {
    position: 'absolute',
    width: 400,
    height: '90vh',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
},
}));

const Receta = ({receta}) => {

    const [ modalStyle ] = useState(getModalStyle);
    const [ open, setOpen ] = useState(false);
    const classes = useStyles();

    const handleOpen = (status) => {
        setOpen(status);
    }

    const { setIdReceta, recetaBebida, setRecetaBebida } = useContext(ModalContext);

    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>
                <img className="card-img-top" src={receta.strDrinkThumb} alt=""/>
                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            setIdReceta(receta.idDrink);
                            handleOpen(true);
                        }}
                    >Ver Receta</button>
                    <Modal
                        open={open}
                        onClose={() => {
                            setIdReceta(null);
                            setRecetaBebida({});
                            handleOpen(false);
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{recetaBebida.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p className="justify-content">
                                {recetaBebida.strInstructions}
                            </p>
                            <img className="img-fluid my-2" src={recetaBebida.strDrinkThumb} alt="" />
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
 
export default Receta;
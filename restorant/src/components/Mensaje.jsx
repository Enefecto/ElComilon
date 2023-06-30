import React from 'react'

const Mensaje = ({setDisplayMensaje}) => {

    const handleClose = () => {
        setDisplayMensaje(false);
    }

    return (
    <div className='superPosicion'>
    <div className="mensaje">
        <h2>Agregado Correctamente</h2>
        <div className="flex-Right">
            <button onClick={handleClose}>
                Aceptar
            </button>
        </div>
    </div>
    </div>
    )
}

export default Mensaje;

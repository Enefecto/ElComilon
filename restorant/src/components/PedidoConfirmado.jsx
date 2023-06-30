import React from 'react'

export const PedidoConfirmado = ({SetDisplayPedido}) => {
    const handleClose = () => {
        SetDisplayPedido(false);
    }

    return (
    <div className='superPosicion'>
    <div className="mensajePedido">
        <h2>Hola! Tu pedido ya va en camino</h2>
        <div className="flex-Right">
            <button onClick={handleClose}>
                Aceptar
            </button>
        </div>
    </div>
    </div>
    )
}

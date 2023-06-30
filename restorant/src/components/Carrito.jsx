import React from 'react'
import { PedidoConfirmado } from './PedidoConfirmado';

const Carrito = ({setDisplayCarrito,setDisplayMainPage,carrito,setCarrito,displayPedido,SetDisplayPedido}) => {
    
    const backMainPage = () => {
        setDisplayCarrito(false);
        setDisplayMainPage(true);
    }

    const emptycart = () => {
        setCarrito([]);
    }

    const activatePedido = () => {
        if (carrito.length > 0){
            SetDisplayPedido(true);
            setCarrito([]);
        }
    }

    const deleteDish = (p) => {
        const index = carrito.findIndex((plato) => plato.ProductId === p.ProductId);
        if (index !== -1) {
            const updatedCarrito = [...carrito];
            updatedCarrito.splice(index, 1);
            setCarrito(updatedCarrito);
        }
    }
      

    return (
    <div className='background-login'>
    <div className='conteiner-general'>
        <div className="conteiner-carrito">
            <h2>Carrito De Compras</h2>
            <ul className="carrito">
                {
                carrito.length > 0 ? carrito.map((p) => {
                    return (
                    <li className="plato">
                        <span>{p.ProductTitle}</span>
                        <span>${p.ProductPrice}</span>
                        <button onClick={() => deleteDish(p)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="4rem" height="4rem" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M4 7l16 0" />
                                <path d="M10 11l0 6" />
                                <path d="M14 11l0 6" />
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                            </svg>
                        </button>
                    </li>
                    )})
                :
                <span id='vacio'>Pide algo!!</span>
                }
            </ul>
            <div className="optionsCarrito">
                <button onClick={emptycart}>Vaciar</button>
                <button onClick={activatePedido}>Realizar Pedido</button>
            </div>
        </div>
        <button className='back' onClick={backMainPage}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-back" width="36" height="36" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
                </svg>
                Volver
        </button>
    </div>
    {
        displayPedido ? <PedidoConfirmado SetDisplayPedido={SetDisplayPedido} /> : ''
    }
    </div>
  )
}

export default Carrito;
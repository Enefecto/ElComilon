import React, { useEffect } from 'react'
import { useState } from 'react';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import Mensaje from './Mensaje';

const MainPage = ({ setDisplayMainPage,
                    setDisplayLogin,
                    setDisplayManageMenu,
                    setDisplayEditAccount,
                    displayAddProduct,
                    setDisplayAddProduct,
                    displayEditProduct,
                    setDisplayEditProduct,
                    setDisplayCarrito,
                    displayMensaje,
                    setDisplayMensaje,
                    sessionStarted,
                    setSesionStarted,
                    user,
                    setUser,
                    carrito,
                    setCarrito}) => {
    
    //ButtonAdmin
    const [buttonAdmin, setButtonAdmin] = useState(false);
    
    //Productos
    const [products,setProducts] = useState([]);
    const [platosPrincipales, setPlatosPrincipales] = useState([]);
    const [bebidas, setBebidas] = useState([]);
    const [aperitivos, setAperitivos] = useState([]);
    const [ensaladas, setEnsaladas] = useState([]);
    const [postres, setPostres] = useState([]);
    
    //IdProducto
    const [idProducto, setIdProducto] = useState(0);

    const activateLogin = () => {
        setDisplayMainPage(false);
        setDisplayLogin(true);
    }

    const activateManageMenu = () => {
        setDisplayMainPage(false);
        setDisplayManageMenu(true);
    }

    const signOff = () => {
        setSesionStarted(false);
        localStorage.setItem('User', JSON.stringify('CERRADA'));
    }

    const editProfile = () => {
        setDisplayMainPage(false);
        setDisplayEditAccount(true);
    }

    const activateAddProduct = () => {
        setDisplayAddProduct(true);
    }

    const activateEditProduct = (id) =>{
        setIdProducto(id);
        setDisplayEditProduct(true);
    }

    const deleteProduct = (id) => {
        fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
            method: 'DELETE'
        })
        .then((response) => {
            if (response.ok) {
            console.log('La solicitud DELETE fue exitosa.');

            // Realiza el fetch GET después de que se haya completado la solicitud DELETE
            fetch('http://127.0.0.1:8000/api/products/')
                .then(response => response.json())
                .then(data => {
                    // Maneja la respuesta de la solicitud GET aquí
                    setProducts(data);
                })
                .catch(error => {
                    // Maneja los errores aquí
                    console.error('Error:', error);
                });
            } else {
                console.log('La solicitud DELETE falló.');
            }
        })
        .catch((error) => {
            console.error('Error en la solicitud DELETE:', error);
        });
    }

    const activateCarrito = () => {
        setDisplayMainPage(false);
        setDisplayCarrito(true);
    }

    const handleCarrito = (plato) => {
        setCarrito([...carrito, plato]);
        setDisplayMensaje(true);
    }

    useEffect(() => {
        let storage = JSON.parse(localStorage.getItem('User'));
        if (storage && storage !== 'CERRADA'){
            setSesionStarted(true);
            setUser(storage);
        }
        if (sessionStarted && user.UserTypeId === 2){
            setButtonAdmin(true);
        } else {
            setButtonAdmin(false);
        }
        // eslint-disable-next-line
    },[sessionStarted])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products/')
        .then(response => response.json())
        .then(data => {
            // Maneja la respuesta de la solicitud aquí
            setProducts(data);
        })
        .catch(error => {
                // Maneja los errores aquí
                console.error('Error:', error);
        });

        // eslint-disable-next-line
    },[])
    
    useEffect(() => {
        // Verificar que el estado de los productos no esté vacío
        if (products.length > 0) {
            // Filtrar los productos por tipo y actualizar los estados correspondientes
            setPlatosPrincipales(products.filter(product => product.ProductType === "Platos Principales"));
            setBebidas(products.filter(product => product.ProductType === "Bebidas"));
            setAperitivos(products.filter(product => product.ProductType === "Aperitivos"));
            setEnsaladas(products.filter(product => product.ProductType === "Ensaladas"));
            setPostres(products.filter(product => product.ProductType === "Postres"));
        }
    }, [products]);

    return (
    <div className='conteiner'>
        <header className='header'>
            <nav className='barra'>
                <ul>
                    <li>El<span>Comilon</span></li>
                    {buttonAdmin ? <li onClick={activateManageMenu}>Administrar Cuentas</li> : ''}
                    {
                    sessionStarted && !buttonAdmin?
                        <li onClick={activateCarrito}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart" width="4rem" height="4rem" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                <path d="M17 17h-11v-14h-2" />
                                <path d="M6 5l14 1l-1 7h-13" />
                            </svg>
                        </li>
                        :
                        ''
                    }
                    {sessionStarted ? 
                        <div className="dropdown-menu">
                            Opciones
                            <ul className="dropdown">
                                <li onClick={editProfile}>Editar Perfil</li>
                                <li onClick={signOff}>Cerrar Sesión</li>
                            </ul>
                        </div>    
                        : 
                        <li onClick={activateLogin}>Iniciar Sesión</li>
                    }
                </ul>                 
            </nav>
            <h1 className='slogan'>¡Deliciosos platos para todos los gustos!</h1>
        </header>
        <main>
            <div className='top-sections'>
                <h2>Menu</h2>
                {
                    buttonAdmin ? <button id='add-product' onClick={activateAddProduct}>Agregar</button> : ''
                }
            </div>
            <section>
                <h2>Platos Principales</h2>
                {
                platosPrincipales ? platosPrincipales.map( p => {
                    return (
                    <div key={p.ProductId} className="product">
                        <h3>{p.ProductTitle}</h3>
                        <p><span>Precio:</span> ${p.ProductPrice}</p>
                        {
                        (sessionStarted && !buttonAdmin) ? 
                        <button onClick={() => handleCarrito(p)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="4rem" height="4rem" viewBox="0 0 24 24" strokeWidth="2" stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M12 5l0 14" />
                                <path d="M5 12l14 0" />
                            </svg>
                        </button>
                        :
                        sessionStarted ?
                        <div className='optionsOnProducts'>
                            <button onClick={() => activateEditProduct(p.ProductId)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width="4rem" height="4rem" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                                    <path d="M13.5 6.5l4 4" />
                                </svg>
                            </button>
                            <button onClick={() => deleteProduct(p.ProductId)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="4rem" height="4rem" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M4 7l16 0" />
                                    <path d="M10 11l0 6" />
                                    <path d="M14 11l0 6" />
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                </svg>
                            </button>
                        </div>
                        :
                        ''
                        }
                    </div>
                    )
                }) : ''
                }
            </section>
            <section>
                <h2>Bebidas</h2>
                {
                bebidas ? bebidas.map( p => {
                    return (
                    <div key={p.ProductId} className="product">
                        <h3>{p.ProductTitle}</h3>
                        <p><span>Precio:</span> ${p.ProductPrice}</p>
                        {
                        (sessionStarted && !buttonAdmin) ? 
                        <button onClick={() => handleCarrito(p)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="4rem" height="4rem" viewBox="0 0 24 24" strokeWidth="2" stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M12 5l0 14" />
                                <path d="M5 12l14 0" />
                            </svg>
                        </button>
                        :
                        sessionStarted ? 
                        <div className='optionsOnProducts'>
                            <button onClick={() => activateEditProduct(p.ProductId)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width="4rem" height="4rem" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                                    <path d="M13.5 6.5l4 4" />
                                </svg>
                            </button>
                            <button onClick={() => deleteProduct(p.ProductId)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="4rem" height="4rem" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M4 7l16 0" />
                                    <path d="M10 11l0 6" />
                                    <path d="M14 11l0 6" />
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                </svg>
                            </button>
                        </div>
                        :
                        ''
                        }
                    </div>
                    )
                }) : ''
                }
            </section>
            <section>
                <h2>Aperitivos</h2>
                {
                aperitivos ? aperitivos.map( p => {
                    return (
                    <div key={p.ProductId} className="product">
                        <h3>{p.ProductTitle}</h3>
                        <p><span>Precio:</span> ${p.ProductPrice}</p>
                        {
                        (sessionStarted && !buttonAdmin) ? 
                        <button onClick={() => handleCarrito(p)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="4rem" height="4rem" viewBox="0 0 24 24" strokeWidth="2" stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M12 5l0 14" />
                                <path d="M5 12l14 0" />
                            </svg>
                        </button>
                        : 
                        sessionStarted ? 
                        <div className='optionsOnProducts'>
                            <button onClick={() => activateEditProduct(p.ProductId)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width="4rem" height="4rem" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                                    <path d="M13.5 6.5l4 4" />
                                </svg>
                            </button>
                            <button onClick={() => deleteProduct(p.ProductId)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="4rem" height="4rem" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M4 7l16 0" />
                                    <path d="M10 11l0 6" />
                                    <path d="M14 11l0 6" />
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                </svg>
                            </button>
                        </div>
                        :
                        ''
                        }
                    </div>
                    )
                }) : ''
                }
            </section>
            <section>
                <h2>Ensaladas</h2>
                {
                ensaladas ? ensaladas.map( p => {
                    return (
                    <div key={p.ProductId} className="product">
                        <h3>{p.ProductTitle}</h3>
                        <p><span>Precio:</span> ${p.ProductPrice}</p>
                        {
                        (sessionStarted && !buttonAdmin) ? 
                        <button onClick={() => handleCarrito(p)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="4rem" height="4rem" viewBox="0 0 24 24" strokeWidth="2" stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M12 5l0 14" />
                                <path d="M5 12l14 0" />
                            </svg>
                        </button>
                        : 
                        sessionStarted ? 
                        <div className='optionsOnProducts'>
                            <button onClick={() => activateEditProduct(p.ProductId)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width="4rem" height="4rem" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                                    <path d="M13.5 6.5l4 4" />
                                </svg>
                            </button>
                            <button onClick={() => deleteProduct(p.ProductId)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="4rem" height="4rem" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M4 7l16 0" />
                                    <path d="M10 11l0 6" />
                                    <path d="M14 11l0 6" />
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                </svg>
                            </button>
                        </div>
                        :
                        ''
                        }
                    </div>
                    )
                }) : ''
                }
            </section>
            <section>
                <h2>Postres</h2>
                {
                postres ? postres.map( p => {
                    return (
                    <div key={p.ProductId} className="product">
                        <h3>{p.ProductTitle}</h3>
                        <p><span>Precio:</span> ${p.ProductPrice}</p>
                        {
                        (sessionStarted && !buttonAdmin) ? 
                        <button onClick={() => handleCarrito(p)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="4rem" height="4rem" viewBox="0 0 24 24" strokeWidth="2" stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M12 5l0 14" />
                                <path d="M5 12l14 0" />
                            </svg>
                        </button>
                        : 
                        sessionStarted ? 
                        <div className='optionsOnProducts'>
                            <button onClick={() => activateEditProduct(p.ProductId)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width="4rem" height="4rem" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                                    <path d="M13.5 6.5l4 4" />
                                </svg>
                            </button>
                            <button onClick={() => deleteProduct(p.ProductId)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="4rem" height="4rem" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M4 7l16 0" />
                                    <path d="M10 11l0 6" />
                                    <path d="M14 11l0 6" />
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                </svg>
                            </button>
                        </div>
                        :
                        ''
                        }
                    </div>
                    )
                }) : ''
                }
            </section>
        </main>
        <footer className='footer'>
            <p>© 2023 ElComilon. Todos los derechos reservados.</p>
        </footer>
        {
            displayAddProduct ? <AddProduct setDisplayAddProduct={setDisplayAddProduct}
                                            setProducts={setProducts}/>: ''
        }
        {
            displayEditProduct ? <EditProduct   setDisplayEditProduct={setDisplayEditProduct}
                                                idProducto={idProducto}
                                                setProducts={setProducts}/> : ''
        }
        {
            displayMensaje ? <Mensaje setDisplayMensaje={setDisplayMensaje}/> : ''
        }
    </div>
    )
}

export default MainPage;
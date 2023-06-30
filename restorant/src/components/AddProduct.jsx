import React,{useState,useEffect} from 'react'

const AddProduct = ({setDisplayAddProduct,setProducts}) => {

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [type, setType] = useState('Platos Principales');
    
    const [errorMessagge, setErrorMessagge] = useState('');
    const [succesfulMessagge, setSuccesfulMessagge] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
  
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };
  
    const handleTypeChange = (event) => {
        setType(event.target.value);
    };
  
    const handleAddProduct = (e) => {
        e.preventDefault();
      
        if (title.length > 0 && price > 0) {
            let tempProduct = {
                ProductTitle: title,
                ProductPrice: parseInt(price),
                ProductType: type
            };
        
            fetch('http://127.0.0.1:8000/api/products/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(tempProduct),
            })
            .then(response => response.json())
            .then(data => {
                // Maneja la respuesta de la solicitud POST aquí
                // Limpia los campos después de agregar el producto
                setTitle('');
                setPrice(0);
                setType('Platos Principales');
                setErrorMessagge('');
                setSuccesfulMessagge('Agregado Correctamente');
        
                // Realiza el fetch GET después de que se haya completado la solicitud POST
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
            })
            .catch(error => {
              // Maneja los errores aquí
              console.error('Error:', error);
            });
        } else {
          setSuccesfulMessagge('');
          setErrorMessagge('Producto Invalido');
        }
    };
      
    
    const handleClose = () =>{
        setDisplayAddProduct(false);
    }

    useEffect(() => {
        setSuccesfulMessagge('');
        setErrorMessagge('');
    },[])

    return (
    <div className='superPosicion'>
        <form className="manageMenu" onSubmit={handleAddProduct}>
            <div className="formProduct">
                <button className="closeButton" onClick={handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#FFF" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M18 6l-12 12" />
                        <path d="M6 6l12 12" />
                    </svg>
                </button>
                <h2>Agregar Producto Al Menú</h2>
                <div>
                    <label htmlFor="title">Título:</label>
                    <input type="text" id="title" value={title} onChange={handleTitleChange} />
                </div>
                <div>
                    <label htmlFor="price">Precio:</label>
                    <input type="number" id="price" value={price} onChange={handlePriceChange} />
                </div>
                <div>
                    <label htmlFor="type">Tipo:</label>
                    <select id="type" value={type} onChange={handleTypeChange} >
                        <option value="Platos Principales">Platos Principales</option>
                        <option value="Bebidas">Bebidas</option>
                        <option value="Aperitivos">Aperitivos</option>
                        <option value="Ensaladas">Ensaladas</option>  
                        <option value="Postres">Postres</option>  
                    </select>
                </div>
                <span className='error-message'>{errorMessagge}</span>
                <span className='successful-message'>{succesfulMessagge}</span>
                <button type='submit' id='loginButton'>Agregar</button>
            </div>
        </form>
    </div>
      
  )
}

export default AddProduct;
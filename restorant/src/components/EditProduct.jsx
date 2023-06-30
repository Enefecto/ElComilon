import React,{useState,useEffect} from 'react'

const EditProduct = ({setDisplayEditProduct,idProducto,setProducts}) => {

    const [errorMessagge, setErrorMessagge] = useState('');

    const [newProduct, setNewProduct] = useState({
        ProductId: idProducto,
        ProductTitle: '',
        ProductPrice: 0,
        ProductType: ''
    });
  
    const handleAddProduct = (e) => {
        e.preventDefault();

        if (newProduct.ProductTitle.length > 0 &&
            newProduct.ProductPrice > 0
        ){
            fetch('http://127.0.0.1:8000/api/products/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });
            
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
        
            setErrorMessagge('');
            setDisplayEditProduct(false);
        } else {
            setErrorMessagge('Producto Invalido');
        }

    };
    
    const handleClose = () =>{
        setDisplayEditProduct(false);
    }

    useEffect(() => {
        setErrorMessagge('');
        //Producto a editar
        fetch('http://127.0.0.1:8000/api/products/')
        .then(response => response.json())
        .then(data => {
            // Maneja la respuesta de la solicitud aquí
            setNewProduct(data.find(p => p.ProductId === idProducto));
        })
        .catch(error => {
                // Maneja los errores aquí
                console.error('Error:', error);
        });
        
        // eslint-disable-next-line
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
                <h2>Editar Producto Del Menú</h2>
                <div>
                    <label htmlFor="title">Título:</label>
                    <input type="text" id="title" value={newProduct.ProductTitle} onChange={e => setNewProduct({...newProduct, ProductTitle: e.target.value})} />
                </div>
                <div>
                    <label htmlFor="price">Precio:</label>
                    <input type="number" id="price" value={newProduct.ProductPrice} onChange={e => setNewProduct({...newProduct, ProductPrice: e.target.value})} />
                </div>
                <div>
                    <label htmlFor="type">Tipo:</label>
                    <select id="type" value={newProduct.ProductType} onChange={e => setNewProduct({...newProduct, ProductType: e.target.value})} >
                        <option value="Platos Principales">Platos Principales</option>
                        <option value="Bebidas">Bebidas</option>
                        <option value="Aperitivos">Aperitivos</option>
                        <option value="Ensaladas">Ensaladas</option>  
                        <option value="Postres">Postres</option>  
                    </select>
                </div>
                <span className='error-message'>{errorMessagge}</span>
                <button type='submit' id='loginButton'>Editar</button>
            </div>
        </form>
    </div>
      
  )
}

export default EditProduct;
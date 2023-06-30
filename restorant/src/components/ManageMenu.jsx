import React,{useState,useEffect} from 'react'

const ManageMenu = ({setDisplayMainPage,setDisplayManageMenu}) => {
    
    const [users, setUsers] = useState([]);

    const backLogin = () => {
        setDisplayManageMenu(false);
        setDisplayMainPage(true);
    }
    
    const deleteAccount = (id) => {
        fetch(`http://127.0.0.1:8000/api/users/${id}/`, {
            method: 'DELETE'
        })
        .then((response) => {
            if (response.ok) {
            console.log('La solicitud DELETE fue exitosa.');
            // Realiza el fetch GET después de que se haya completado la solicitud DELETE
            fetch('http://127.0.0.1:8000/api/users/')
                .then(response => response.json())
                .then(data => {
                    // Maneja la respuesta de la solicitud GET aquí
                    setUsers(data);
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

    useEffect(()=>{
        // Solicitud de usuarios
        fetch('http://127.0.0.1:8000/api/users/')
        .then(response => response.json())
        .then(data => {
            // Maneja la respuesta de la solicitud aquí
            setUsers(data);
        })
        .catch(error => {
                // Maneja los errores aquí
                console.error('Error:', error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className='background-login'>
        <div className='conteiner-general'>
            <div className="administration">
                <div className="principal-content">
                    <div className="conteiner-manage">
                        <div className="manage-top">
                            <h2>Administrar Cuentas</h2>
                        </div>
                        <ul className="manage-posts">
                            {
                            users ? users.filter((user) => user.UserTypeId === 1).map((user) => (
                                <li key={user.UserId} className="account">
                                    <div className='first-div'>
                                        <span id='account-name'>{user.UserName}</span>
                                        <span id='account-gmail'>{user.UserEmail}</span>
                                        <span id='account-type'>Cliente</span>
                                    </div>
                                    <div>
                                        <button onClick={() => deleteAccount(user.UserId)}>
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
                                </li>
                            ))
                            :
                            ''
                            }
                        </ul>
                    </div>
                </div>
            </div>
            
            <button className='back' onClick={backLogin}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-back" width="36" height="36" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
                    </svg>
                    Volver
            </button>
        </div>
        </div>
    )
}

export default ManageMenu;
import React, {useState, useEffect} from 'react'
import { validateEmail, validatePhoneNumber } from './Validations';

const CreateAccount = ({setDisplayCreateAccount,setDisplayLogin}) => {
    
    const [errorLogin, setErrorLogin] = useState('');
    const [users, setUsers] = useState([]);

    const getData = (e) => {
        e.preventDefault();
    
        // Crear nuevo usuario temporalmente
        let tempUser = {
            UserName: e.target.createAccountUser.value,
            UserEmail: e.target.createAccountEmail.value,
            UserAddress: e.target.createAccountAddress.value,
            UserPhone: e.target.createAccountNumber.value,
            UserPassword: e.target.createAccountPassword.value,
            UserTypeId: 1
        };
        
        if (
            tempUser.UserName.length > 0 &&
            validateEmail(tempUser.UserEmail) &&
            validatePhoneNumber(tempUser.UserPhone) &&
            tempUser.UserPassword.length > 0
        ) {
            // Validar si el usuario existe o no y agregarlo o negarlo.

            if(users){
                let coincidences = users.filter((user) => {
                    return user.UserEmail === tempUser.UserEmail;
                });

                if (coincidences.length === 0) {
                    fetch('http://127.0.0.1:8000/api/users/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(tempUser),
                    });

                    setErrorLogin('');

                    //Cerrar CreateAccount
                    setDisplayCreateAccount(false);
                    setDisplayLogin(true);
                } else {
                    setErrorLogin('Este Correo Electronico Ya Esta En Uso.');
                }
            }
        } else {
            setErrorLogin('Ingrese correctamente los datos');
        }
    };
    
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

    const backLogin = () => {
        setDisplayCreateAccount(false);
        setDisplayLogin(true);
    }

    return (
    <div className='background-login'>
    <div className='conteiner-general'>
        <form className='login-form create-account-form' onSubmit={getData}>
            <h1 className='login-form-title'>Crear Cuenta</h1>
            <div className='top-form'>
                <div className='icon-in-input'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width="36" height="36" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="12" cy="8" r="4" />
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                    <input  className='login-user' type="text" placeholder='Nombre'
                            id='createAccountUser' name='user' autoComplete='off'/>
                </div>
                <div className='icon-in-input'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width="36" height="36" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <polyline points="3 7 12 13 21 7" />
                    </svg>
                    <input  className='login-email' type="email" placeholder='Correo Electronico'
                            id='createAccountEmail' name='email' autoComplete='off'/>    
                </div>
                <div className='icon-in-input'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home-2" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                        <path d="M10 12h4v4h-4z" />
                    </svg>
                    <input  className='login-address' type="text" placeholder='Dirección'
                            id='createAccountAddress' name='address' autoComplete='off'/>
                </div>
                <div className='icon-in-input'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-device-mobile" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14z" />
                        <path d="M11 4h2" />
                        <path d="M12 17v.01" />
                    </svg>
                    <input  className='login-number' type="text" placeholder='Numero'
                            id='createAccountNumber' name='number' autoComplete='off'/>
                </div>
                <div className='icon-in-input'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-lock" width="36" height="36" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <rect x="5" y="11" width="14" height="10" rx="2" />
                        <circle cx="12" cy="16" r="1" />
                        <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                    </svg>
                    <input  className='login-password' type="password" placeholder='Contraseña'
                            id='createAccountPassword' name='password' autoComplete='off'/>
                </div>
                <span className='error-message'>{errorLogin ? errorLogin : ''}</span>
                <button id='loginButton' type='submit'>Crear Cuenta</button>
            </div>
        </form>
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

export default CreateAccount;
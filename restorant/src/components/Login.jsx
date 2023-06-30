import React, {useState, useEffect} from 'react'
import { validateEmail } from './Validations';

const Login = ({setDisplayLogin,setDisplayCreateAccount,setDisplayMainPage,setSesionStarted,setUser}) => {

    const [errorLogin, setErrorLogin] = useState('');
    const [users, setUsers] = useState([]);

    const activateCreateAccount = () => {
        setDisplayLogin(false);
        setDisplayCreateAccount(true);
    }

    const backMainPage = () => {
        setDisplayLogin(false);
        setDisplayMainPage(true);
    }

    const tryLogin = (e) => {
        e.preventDefault();
        
        //Guardar temporalmente al usuario para validar login
        let tempUser = {
			email: e.target.createAccountEmail.value,
            password: e.target.createAccountPassword.value,
            type: parseInt(e.target.createAccountType.value)
		};

        if (validateEmail(tempUser.email)  && tempUser.password.length > 0 ){
            if (users) {
                let coincidences = users.filter( user => {
                    return  user.UserEmail === tempUser.email
                            && user.UserPassword === tempUser.password
                            && user.UserTypeId === tempUser.type;
                });
                if (coincidences.length === 1){
                    //Dar iniciada la sesion
                    setSesionStarted(true); 

                    let UsuarioLogeado = {
                        UserId: coincidences[0].UserId,
                        UserName: coincidences[0].UserName,
                        UserEmail: coincidences[0].UserEmail,
                        UserAddress: coincidences[0].UserAddress,
                        UserPhone: coincidences[0].UserPhone,
                        UserTypeId: coincidences[0].UserTypeId,
                    };
                    
                    localStorage.setItem('User', JSON.stringify(UsuarioLogeado));
                    setUser(UsuarioLogeado);
                    setErrorLogin('');
                    //Volver a la pantalla principal
                    setDisplayLogin(false);
                    setDisplayMainPage(true);
                } else {
                    setErrorLogin('Gmail o contraseña incorrecto.');
                }
            }
        } else {
            setErrorLogin('Ingrese correctamente los datos');
        }
    }

    useEffect(() => {
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
    },[errorLogin])

    return (
        <div className='background-login'>
        <div className='conteiner-general'>
            <form className='login-form' onSubmit={tryLogin}>
                <h1 className='login-form-title'>Bienvenido</h1>
                <div className='top-form'>
                    <div className='icon-in-input'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width="36" height="36" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                            <polyline points="3 7 12 13 21 7" />
                        </svg>
                        <input  className='login-email' type="email" placeholder='Correo Electronico'
                                id='createAccountEmail'/>    
                    </div>
                    <div className='icon-in-input'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-lock" width="36" height="36" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <rect x="5" y="11" width="14" height="10" rx="2" />
                            <circle cx="12" cy="16" r="1" />
                            <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                        </svg>
                        <input  className='login-password' type="password" placeholder='Contraseña'
                                id='createAccountPassword'/>
                    </div>
                    <div className='flex-right'>
                        <select id="createAccountType">
                            <option value='1'>Cliente</option>
                            <option value='2'>Admin</option>
                        </select>
                    </div>
                    <button id='loginButton' type='submit'>Ingresar</button>
                    <span className='error-message'>{errorLogin ? errorLogin : ''}</span>
                </div>
                <div className='bottom-form'>
                    <span>¿No Tienes Una Cuenta?
                        <span id='createAccount' onClick={activateCreateAccount}>Crear Cuenta</span>
                    </span>
                </div>
            </form>
            <button className='back' onClick={backMainPage}>
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

export default Login;
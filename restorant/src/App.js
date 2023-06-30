import { useState } from 'react';
import './App.css';
import MainPage from './components/MainPage';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import ManageMenu from './components/ManageMenu';
import EditAccount from './components/EditAccount';
import Carrito from './components/Carrito';

function App() {

	//Estados de paginas
	const [displayMainPage, setDisplayMainPage] = useState(true);
	const [displayLogin, setDisplayLogin] = useState(false);
	const [displayCreateAccount, setDisplayCreateAccount] = useState(false);
	const [displayEditAccount, setDisplayEditAccount] = useState(false);
	const [displayManageMenu, setDisplayManageMenu] = useState(false);
	const [displayAddProduct, setDisplayAddProduct] = useState(false);
	const [displayEditProduct, setDisplayEditProduct] = useState(false);
	const [displayCarrito, setDisplayCarrito] = useState(false);
	const [displayMensaje, setDisplayMensaje] = useState(false);
	const [displayPedido, SetDisplayPedido] = useState(false);

	//¿Usuario logeado?
    const [sessionStarted, setSesionStarted] = useState(false);
    const [user, setUser] = useState({
        UserId: 0,
        UserName: '',
        UserEmail: '',
		UserAddress: '',
		UserPhone: 0,
        UserTypeId: 0,
    });

	//Carrito
	const [carrito, setCarrito] = useState([]);

	if (displayMainPage){
		return(
			<MainPage 	setDisplayMainPage={setDisplayMainPage}
						setDisplayLogin={setDisplayLogin}
						setDisplayManageMenu={setDisplayManageMenu}
						setDisplayEditAccount={setDisplayEditAccount}
						displayAddProduct={displayAddProduct}
						setDisplayAddProduct={setDisplayAddProduct}
						displayEditProduct={displayEditProduct}
						setDisplayEditProduct={setDisplayEditProduct}
						setDisplayCarrito={setDisplayCarrito}
						displayMensaje={displayMensaje}
						setDisplayMensaje={setDisplayMensaje}
						sessionStarted={sessionStarted}
						setSesionStarted={setSesionStarted}
						user={user}
						setUser={setUser}
						carrito={carrito}
						setCarrito={setCarrito}/>
		)
	} else if (displayLogin){
		return(
			<Login 	setDisplayCreateAccount={setDisplayCreateAccount}
					setDisplayLogin={setDisplayLogin}
					setDisplayMainPage={setDisplayMainPage}
					setSesionStarted={setSesionStarted}
					setUser={setUser}/>
		)
	} else if (displayCreateAccount){
		return (
			<CreateAccount 	setDisplayCreateAccount={setDisplayCreateAccount}
							setDisplayLogin={setDisplayLogin}/>
		)
	} else if (displayManageMenu){
		return (
			<ManageMenu 	setDisplayMainPage={setDisplayMainPage}
							setDisplayManageMenu={setDisplayManageMenu}/>
		)
	} else if (displayEditAccount){
		return (
			<EditAccount 	setDisplayMainPage={setDisplayMainPage}
							setDisplayEditAccount={setDisplayEditAccount}
							setSesionStarted={setSesionStarted}/>
		)
	} else if (displayCarrito){
		return <Carrito setDisplayCarrito={setDisplayCarrito}
						setDisplayMainPage={setDisplayMainPage}
						carrito={carrito}
						setCarrito={setCarrito}
						displayPedido={displayPedido}
						SetDisplayPedido={SetDisplayPedido}
						/>
	}
}

export default App;

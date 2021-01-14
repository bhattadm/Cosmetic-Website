import './App.css';
import { useState, useEffect } from 'react';
import { fetchEndSession, fetchCheckSession} from './services';
import Nav from './Nav';
import Login from './Login';
import ShowProducts from './ShowProducts';
import ShowViewCart from './ShowViewCart';
import ShowCheckout from './ShowCheckout';

function App() {

  const [userState,setUserState]   = useState({ isLoggedIn: false, isPending: true});
  const [userName,setUserName]     = useState('');
  const [isHome,setIsHome]         = useState(false);
  const [isViewCart,setIsViewCart] = useState(false);
  const [isCheckout,setIsCheckout] = useState(false);
  
  useEffect( () => {
    fetchCheckSession()
    .then( userinfo => {
      setUserState({
        isLoggedIn: true,
        isPending: false,
      });
      setUserName(userinfo.username);
      setIsHome(false);
      setIsViewCart(false);
      setIsCheckout(false);
    })
    .catch( () => {
      setUserState({
        isLoggedIn: false,
        isPending: false,
      });
      setIsHome(false);
      setIsViewCart(false);
      setIsCheckout(false);
    });
  }, []); 

  const login = function({username}) {
    setUserState({
      isLoggedIn: true,
      isPending: false,
    });
    setUserName(username);
    setIsHome(false);
    setIsViewCart(false);
    setIsCheckout(false);
  };

  if(userState.isPending) {
    return (
      <div className="app">
        Loading...
      </div>
    );
  }
  
  const toHomePage =  ()=> {  
    setIsHome(true);
    setIsViewCart(false);
    setIsCheckout(false);
  }

  const toViewCartPage = ()=> {
    setIsViewCart(true);
    setIsHome(false);
    setIsCheckout(false);
  }

  const toCheckoutPage =()=> {
    setIsCheckout(true);
    setIsViewCart(false);
    setIsHome(false);
  }

  const logout = function() {
    setUserState({
      ...userState,
      isPending: true,
    });
    fetchEndSession()
    .then( () => {
      setUserState({
        isLoggedIn: false,
        isPending: false,
      });
      setIsHome(false);
      setIsViewCart(false);
      setIsCheckout(false);
    })
    .catch( () => {
      setUserState({
        ...userState,
        isPending: false,
      });
      setIsHome(false);
      setIsViewCart(false);
      setIsCheckout(false);
    });
  };

  let content;
  if(userState.isLoggedIn && isViewCart) {
    content =<ShowViewCart username = {userName}/> 
  }
  else if(userState.isLoggedIn && isCheckout) {
    content =<ShowCheckout username = {userName}/> 
  }
  else if(userState.isLoggedIn) {
    content = <ShowProducts username={userName} isHome = {isHome} setIsHome = {setIsHome} />;
  } 
  else {
    content = <Login onLogin={login}/>;
  }

  return (
    <div className="app">
      <h2 className = "title">Glow Away</h2>
      <Nav user          = {userState} 
          onLogout       = {logout} 
          toHomePage     = {toHomePage} 
          toViewCartPage = {toViewCartPage} 
          toCheckoutPage = {toCheckoutPage}  
          username       = {userName}/>
      {content}
    </div>
  );
}

export default App;
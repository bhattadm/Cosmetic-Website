const Nav = ({ 
  user, 
  onLogout,
  toHomePage,
  toViewCartPage,
  toCheckoutPage,
  username}) => {

  if(!user.isLoggedIn) {
    return null;
  }
  return (
    <nav>
      <ul className="nav">
        <li><img className="nav-image" src="./images/home.png" alt="home"></img><a href="#home" onClick={toHomePage}><div className = "nav-subtitle">Home</div></a></li>
        <li><img className="nav-image" src="./images/cart.png" alt="cart"></img><a href="#viewCart" onClick={toViewCartPage}><div className = "nav-subtitle">View Cart</div></a></li>    
        <li><img className="nav-image" src="./images/checkout.png" alt="checkout"></img><a href="#checkout" onClick={toCheckoutPage}><div className = "nav-subtitle">Checkout</div></a></li>  
        <li><img className="nav-image" src="./images/logout.png"alt="logout"></img><a href="#logout" onClick={onLogout}><div className = "nav-subtitle">Logout</div></a></li>
      </ul>
    </nav>
  );
};
  
export default Nav;
  
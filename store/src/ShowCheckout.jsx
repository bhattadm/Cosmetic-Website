import {fetchViewCart,fetchPlaceOrder} from './services';
import { useEffect, useState } from 'react';
import { calAmount,calFinalAmount } from './calculateAmount';

const ShowCheckout = ({username }) => {

  const [totalAmount, setTotalAmount] = useState('');
  const [status, setStatus] = useState('');
  const [checkoutList ,setCheckoutList] = useState({});
  const [finalAmount, setFinalAmount] = useState('');
  const [isPlaceOrder, setIsPlaceOrder] = useState(false);
  const [isLoading,setIsLoading] = useState(true);
  
  useEffect(() => {   
    renderCheckoutPage({setCheckoutList});
  },[]);
  
  const renderCheckoutPage= ({setCheckoutist}) => {
    fetchViewCart(username)
    .then((checkoutInfo)=>{
      setCheckoutList(checkoutInfo.cartItems);  
      setTotalAmount(calAmount(checkoutInfo.cartItems));
      setFinalAmount(calFinalAmount(totalAmount));
      setStatus(' '); 
      setIsPlaceOrder(false);
      setIsLoading(false);
    })
    .catch((err)=>{
      setStatus(err.error);   
      setIsPlaceOrder(false);
      setIsLoading(false);
    })
  };

  const placeOrder = () => {
    fetchPlaceOrder(username)
    .then(()=>{
    setStatus(' '); 
    setIsPlaceOrder(true);
    setIsLoading(false);
  })
  .catch((err) => {  
    setStatus(err.error);   
  });
}

  if(isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (Object.keys(checkoutList).length === 0) {
    return (
      <div className="checkout-app">
        <h3>Your Cart is Empty</h3>
      </div>
    );
}

  return (
    <div className="checkout-app">
      { status && <div className ="status">{status}</div> }
      <div className = "checkout-heading">
        <h3>Invoice</h3>
      </div>      
      <div className="bill-to"><b>Billed To: </b>{username}</div>   
      <div className = "table">
        <ul className = "checkout-display-panel">
          <li className = "checkout-list">
            <span className="colheading checkout-check" >Item&nbsp;Name</span> 
            <span className="colheading checkout-check">Rate</span> 
            <span className="colheading checkout-check">Quantity</span> 
            <span className="colheading checkout-check">Total&nbsp;Price</span> 
          </li>
          {Object.values(checkoutList).map( item => (
          <li key = {item.itemId} className = "checkout-list">
            <span className="checkout-check">{item.itemName} </span> 
            <span className="checkout-check">${item.price}</span>
            <span className="checkout-check">{item.orderedQuan}</span> 
            <span className="checkout-check">${item.totalPrice}</span>     
          </li> ) ) }
        </ul>
        <hr className ="thick-line"></hr>
        <div className="checkout-totals">
          <p> 
            <span className="checkout-totals-subtitle">Subtotal: </span>
            <span className = "checkout-subtotals">${totalAmount}</span>
          </p>
          <p>
            <span className="checkout-totals-subtitle">Tax:</span>
            <span className="checkout-tax">10%</span>
          </p>
          <p>
            <span className="checkout-totals-subtitle">Shipping:</span>
            <span className ="checkout-shipping"> $5.99</span>
          </p>
          <hr className ="thick-line"></hr>
          <p>
            <span className="checkout-totals-subtitle">Total:</span> 
            <span className ="checkout-finalamt">${finalAmount}</span> 
          </p>
        </div>
      </div>
      <div className = "place-order-button">
        <button className="place-order" onClick={(e) =>placeOrder()}>Place Order</button> 
      </div>
      {isPlaceOrder?<div className ="place-order-text">Congratulations!!!Your Order is successfully placed!</div>:null}    
    </div>
  )
}
export default ShowCheckout
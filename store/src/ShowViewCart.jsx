import { useEffect, useState } from 'react';
import {fetchViewCart,fetchDeleteItemFromCart,fetchUpdateCartItem } from './services';
import { calAmount } from './calculateAmount';

const ShowViewCart = ({ username}) => {
    
  const [viewCartList,setViewCartList] = useState('');
  const [status, setStatus] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {   
    renderViewCartPage({setViewCartList});
  },[]);

  const renderViewCartPage= ({setViewCartList}) => {
    fetchViewCart(username)
    .then((viewCartInfo)=>{
      setViewCartList(viewCartInfo.cartItems);  
      setTotalAmount(calAmount(viewCartInfo.cartItems));
      setStatus(' '); 
      setIsLoading(false)
    })
    .catch((err)=>{
      setStatus(err.error);  
      setIsLoading(false) 
    })
  }

  const deleteItem = (e) => {
    e.preventDefault();
    const itemId = e.target.dataset.id;
    fetchDeleteItemFromCart(username,itemId)
    .then((viewCartInfo)=>{
      setViewCartList(viewCartInfo.cartItems); 
      setTotalAmount(calAmount(viewCartInfo.cartItems));
      setStatus(''); 
      setIsLoading(false)
    })
    .catch((err)=>{
      setStatus(err.error); 
      setIsLoading(false)
    })
  };

  const increaseQuantity = (itemId, orderedQuan) => {
    const newQuantity = parseInt(orderedQuan) + 1;   
    fetchUpdateCartItem(username, itemId, newQuantity,-1)
    .then((viewCartInfo)=>{
      setViewCartList(viewCartInfo.cartItems); 
      setTotalAmount(calAmount(viewCartInfo.cartItems));
      setStatus(''); 
      setIsLoading(false)
    })
    .catch((err)=>{
      setStatus(err.error);
      setIsLoading(false)
    })
  };

  const decreaseQuantity = (itemId, orderedQuan) => {
    const newQuantity = parseInt(orderedQuan) - 1;
    fetchUpdateCartItem(username, itemId, newQuantity,1)
    .then((viewCartInfo)=>{
      setViewCartList(viewCartInfo.cartItems); 
      setTotalAmount(calAmount(viewCartInfo.cartItems));
      setStatus(''); 
      setIsLoading(false)
    })
    .catch((err)=>{
      setStatus(err.error);
      setIsLoading(false);
    })
  }

  if(isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (Object.keys(viewCartList).length === 0) {
    return (
      <div className="messages">
        <h3>Your Cart is Empty</h3>
      </div>
    );
}
  return (
    <div className="viewcart-item-display">
      { status && <div className ="status">{status}</div> }
      <h2 className="viewcart-title">Shopping Cart</h2>
      <ul className="viewcart-items"> {
        Object.values(viewCartList).map(item => (
          <li key={item.itemId} className = "viewcart-item-list-display">
            <div>
              <div className="viewcart-items-info">
                <span data-item-id={item.itemId} className="item check" >{item.itemName}</span>
                <img className="delete-image" src="./images/delete1.png"data-id={item.itemId}onClick={(e) => deleteItem(e)}></img> 
              </div>
              <div className="viewcart-quantity-info">
                <button data-id={item.itemId} className="increase-quantity " type="button" onClick={() => increaseQuantity(item.itemId, item.orderedQuan)}>+</button> 
                <input data-item-id={item.itemId} className="item-quantity " type="number" placeholder={item.orderedQuan} ></input>
                <button data-id={item.itemId} className="decrease-quantity " type="button" onClick={() => decreaseQuantity(item.itemId, item.orderedQuan)}>-</button> 
              </div>   
              <span data-item-id={item.itemId} className="viewcart-item-price" >Total Price: ${item.totalPrice}</span>
            </div>
          </li>
        ))}
      </ul>
      <p className="viewcart-total"><b>Total Amount :</b>${totalAmount} </p>
    </div>
  );
};

export default ShowViewCart;
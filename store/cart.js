const cartList ={};

const userAlreadyExist = function(username) {
  if(cartList.hasOwnProperty(username)) {
    return true;
  }
  else {
    return false;
  }   
};

const createCartByName = function(username) {
  const newCartListByName = {
    [username]: {
      cartItems: {
      }
    }   
  }    
  cartList[username] =newCartListByName[username];
}

const addItems = function(username, itemDetail) { 
  const id = parseInt(itemDetail.itemId);
  cartList[username].cartItems[id]=itemDetail;
  cartList[username].cartItems[id].orderedQuan = 1;
  cartList[username].cartItems[id].totalPrice = 1*cartList[username].cartItems[id].price;   
}

const containsItem = function(username, itemId) {
  if(!cartList[username] ||!cartList[username].cartItems[itemId] ) {
    return false;
  } 
  return true;
};

const getCartItem = (username, itemId) => {
  if(!cartList[username].cartItems[itemId]) {
    return {};
  } 
  return cartList[username].cartItems[itemId];
};

const removeItemFromCart = (username, itemId) => {
  if(!cartList[username] || !cartList[username].cartItems[itemId] ) {
    return false;
  }
  delete cartList[username].cartItems[itemId];
  return true;
};

const cart = {
  cartList,
  userAlreadyExist,
  createCartByName,
  addItems,
  containsItem,
  getCartItem,
  removeItemFromCart,
};
  
module.exports = cart;
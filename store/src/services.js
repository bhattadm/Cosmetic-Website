export const fetchCheckSession = () => {
  return fetch('/session',  {
    method: 'GET',
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
};
  
export const fetchCreateSession = ({username}) => {
  return fetch('/session',  {
    method: 'POST',
    headers: new Headers({
    'content-type': 'application/json',
    }),
    body: JSON.stringify({ username }),
})
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
});
};

export const fetchEndSession = () => {
  return fetch('/session',  {
    method: 'DELETE',
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
};

export const fetchInventoryList = () => {
  return fetch('/inventory', {
    method: 'GET',
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
};  

export const fetchInventoryItemDetails = (itemId) => {
  return fetch(`/inventory/${itemId}`, {
    method: 'POST',
  }) 
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
}; 


export const fetchAddToCart = (username,itemId) => {
  return fetch(`/cart/${username}`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ itemId: itemId }),
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
}; 

export const fetchAddCommentsToItem = (username,itemId,text) => {
  return fetch(`/inventory/${username}/${itemId}`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ text }),
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
};

export const fetchViewCart = (username) => {
  return fetch(`/cartItems/${username}`, {
    method: 'GET',
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });    
};

export const fetchDeleteItemFromCart = (username,itemId) => {
  return fetch(`/cartItems/${username}/${itemId}`, {
    method: 'DELETE',
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });    
};

export const fetchUpdateCartItem = (username,itemId,newQuantity,factor) => {
  return fetch(`/cartItems/${username}/${itemId}`, {
    method: 'PATCH',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ newQuantity: newQuantity,factor:factor }),
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });    
};

export const fetchPlaceOrder = (username) => {
  return fetch(`/order/${username}`, {
    method: 'DELETE',
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });    
};
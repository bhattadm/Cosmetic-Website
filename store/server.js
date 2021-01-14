const express = require('express');
const cookieParser = require('cookie-parser');

const PORT = 5000;
const app = express();
const session = require('./session');
const inventory = require('./inventory');
const cart = require('./cart');

app.use(cookieParser());
app.use(express.json());
app.use(express.static('./build'));

app.get('/session', (req, res) => {
  const sid = req.cookies.sid;  
  if(!sid) {
    res.status(401).json({ error: 'session-required' });
    return;
  }
  else if(!session.isValidSession(sid)) {
    res.status(403).json({ error: 'session-invalid' });
    return;
  }
  res.status(200).json(session.details[sid]);
});

app.post('/session', (req, res) => {
  const username = req.body.username;
  const { sid, error } = session.create({ username });

  if(error) {
    res.status(400).json({error});
    return;
  }
  else if(!session.isValidSession(sid)) {
    res.status(403).json({ error: 'session-invalid' });
    return;
  }
  else if (/\s/.test(username) || username.toLowerCase()=== 'dog') {
    res.status(404).json({ error: `Bad Login: ${username}`});
    return;
  }
  else if(!cart.userAlreadyExist(username)) {
    cart.createCartByName(username);
  }
 
  res.cookie('sid', sid);
  res.status(200).json(session.details[sid]);
});

app.delete('/session', (req, res) => {
  const sid = req.cookies.sid;
  if(!session.isValidSession(sid)) {
    res.status(403).json({ error: 'session-invalid' });
    return;
  }
  session.remove(sid);
  res.clearCookie('sid');
  res.status(200).json({ sid, status: 'removed' });
});

app.get('/home', (req, res) => {
  const sid = req.cookies.sid;
  if(!session.isValidSession(sid)) {
    res.status(403).json({ error: 'session-invalid' });
    return;
  }
  res.status(200).json({ sid, status: 'home' });
});

app.get('/inventory', (req, res) => {
  const sid = req.cookies.sid;
  if (!session.isValidSession(sid)) {
      res.clearCookie('sid');
      res.status(401).json({ error: 'Login is Required' });
      return;
  }
  res.status(200).json(inventory.inventoryList);
});

app.post('/inventory/:itemId',express.json(), (req, res) => { 
  const sid = req.cookies.sid; 
  const itemId = req.params.itemId;
  
  if(!session.isValidSession(sid)) {
    res.status(403).json({ error: 'session-invalid' });
    return;
  }
  if(!inventory.inventoryList[itemId]) {
    res.status(400).json({ error: 'missing-item' });
    return;
  }

  const itemDetail = inventory.inventoryList[itemId];
  res.status(200).json(itemDetail);  
});

app.put('/inventory/:username/:itemId',express.json(), (req, res) => { 
  const username = req.params.username;
  const itemId = req.params.itemId;  
  const sid = req.cookies.sid;
  const sender = username;
  const text   = req.body.text;

  if (!session.isValidSession(sid)) {
    res.clearCookie('sid');
    res.status(401).json({ error: 'Login is Required' });
    return;
  }
  else if(!session.isValidUser(sid, username)) {
    res.status(403).json({ error: 'No such user' });
    return;
  }
  else if (text=== null || text.match(/^ *$/)) {
    res.status(401).json({ error: 'Text is required' });
    return;
  }

  inventory.addComment(itemId,sender,text);
  res.status(200).json(inventory.inventoryList[itemId].comments);
});

app.post('/cart/:username',express.json(), (req, res) => { 
  const username = req.params.username;
  const itemId = req.body.itemId;   
  const itemDetail = inventory.inventoryList[itemId];
  const sid = req.cookies.sid;

  if (!session.isValidSession(sid)) {
    res.clearCookie('sid');
    res.status(401).json({ error: 'Login is Required' });
    return;
  }
  else if(!session.isValidUser(sid, username)) {
    res.status(403).json({ error: 'No such user' });
    return;
  }
  else if(cart.containsItem(username, itemId )) {
    res.status(400).json({ error: 'Item already exists.But you can add more from View Cart' });
    return;
  }
  else if (inventory.inventoryList[itemId].quantity == 0) {
    res.status(400).json({ error: 'No items left' });
    return;
  }

  inventory.updateStock(itemId, -1);
  cart.addItems(username, itemDetail); 
  res.status(200).json(cart.cartList[username]);
});

app.get('/cartItems/:username', (req, res) => {
  const sid = req.cookies.sid;
  const username = req.params.username;

  if (!session.isValidSession(sid)) {
    res.clearCookie('sid');
    res.status(401).json({ error: 'Login is Required' });
    return;
  }
  else if(!session.isValidUser(sid, username)) {
    res.status(403).json({ error: 'No such user' });
    return;
  }
  
  const cartItems = cart.cartList[username];
  res.status(200).json(cartItems);
});

app.delete('/cartItems/:username/:itemId', (req, res) => {
  const sid = req.cookies.sid;
  const username = req.params.username;
  const itemId = req.params.itemId;

  if (!session.isValidSession(sid)) {
    res.clearCookie('sid');
    res.status(401).json({ error: 'Login is Required' });
    return;
  }
  else if(!session.isValidUser(sid, username)) {
    res.status(403).json({ error: 'No such user' });
    return;
  }
  else if(!cart.containsItem(username, itemId)) {
    res.status(400).json({ error: 'Item does not exist' });
    return;
  }
 
  const itemInfo = cart.getCartItem(username, itemId);
  if(!cart.removeItemFromCart(username, itemId)) {
    res.status(404).json({ error: 'No such Item exist' });
  }
  else {
  inventory.updateStock(itemId, itemInfo.orderedQuan);
  const cartItems = cart.cartList[username];
  res.status(200).json(cartItems);
  }
});

app.patch('/cartItems/:username/:itemId', (req, res) => {
  const sid = req.cookies.sid;
  const username = req.params.username;
  const id = req.params.itemId;
  const newQuantity = req.body.newQuantity;
  const factor = req.body.factor;
 
 if (!session.isValidSession(sid)) {
    res.clearCookie('sid');
    res.status(401).json({ error: 'Login is Required' });
    return;
  }
  else if(!session.isValidUser(sid,username)){
    res.status(403).json({ error: 'No such user' });
    return;
  }
  else if(newQuantity <=0) {
    res.status(400).json({ error: 'Quantity should be more than zero' });
    return;
  } 
  else if(factor === -1 && inventory.inventoryList[id].quantity==0) {
    res.status(400).json({ error: 'No stock available' });
    return;
  }
 
  cart.cartList[username].cartItems[id].orderedQuan = newQuantity;
  cart.cartList[username].cartItems[id].totalPrice = newQuantity * cart.cartList[username].cartItems[id].price;
  inventory.updateStock(id,(factor));
  const cartItems = cart.cartList[username];
  res.status(200).json(cartItems);
});

app.delete('/order/:username', (req, res) => {
  const sid = req.cookies.sid;
  const username = req.params.username;

  if (!session.isValidSession(sid)) {
    res.clearCookie('sid');
    res.status(401).json({ error: 'Login is Required' });
    return;
  }
  else if(!session.isValidUser(sid, username)) {
    res.status(403).json({ error: 'No such user' });
    return;
  }
  delete cart.cartList[username]
  res.status(200).json({sid, status: 'deleted cart'});
});
  
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
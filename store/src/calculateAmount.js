let totalFinalAmount = 0.00;

export const calAmount = (cartItems) => {
  let total=0.00;
  Object.values(cartItems).map(item => (
    total+=parseFloat(item.totalPrice)
  ))
  totalFinalAmount = (total*0.10)+(total)+5.99;
  return total.toFixed(2);
};

export const calFinalAmount = (totalAmount) => {
  return totalFinalAmount.toFixed(2);
};
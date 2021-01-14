## Ecommerce Web Application

### Overview
A single page cosmetic website that includes cookie validation, product display page, searching items, inventory management, sorting, sharing feedback, adding to cart and checkout.

### Installation
1.	Download the project by cloning the repository
2.	Install Node, npm and other packages (cookie-parser, uuid, express)

### Running Server
node server.js

### Built With
NodeJS, Express.JS, Javascript, React, HTML, CSS

### Description
* Login: User can login by providing username. Page will authenticate the username by checking if username is not blank, does not contain whitespace or is not dog. After username is validated, it is assigned to a session id.
* HomePage: User can see the product list only after they have logged in. 
* Search: Search text box is present in the home page where user can search the product by its name.
* Sort: User can sort the product list by name and price both in ascending and descending order. This feature is also present in Home page.
* Navigation: On every page, there is a navigation bar containing links to other sections of the website that allows users to quickly visit any section within the site.
* View Details Page: There is a link (View Details) to view all information about the product in Home page. After checking details about the product, user can add the product to the cart by clicking on “Add to Cart” button. Product can be added only once. But the quantity of product can be increased from the View Cart Page. User can also share their feedback about the product by commenting in text area below “Add to Cart” button by clicking “Add comment” button.
* View Cart: User can view all the items added to shopping cart in View Cart Page. User can increase or decrease the quantity of item and can also remove the item from the cart. User can also check the total amount to be paid and proceed to checkout.
* Checkout: After user has updated their shopping cart, user can view their invoice on checkout. Page shows the total price for the item (unit price * quantity ordered), and total amount for all the items ordered. It displays total amount to be paid after applying shipping cost and tax.
* Place order: After user clicks on place order button on checkout, user gets the message “Congratulations! Your order is successfully placed” and user shopping cart is cleared.
Logout: When user clicks on logout button, user returns to Login Page and the session id is deleted.

### Error Handling
1. Check session id for each user and display error message "Session-invalid/Login is required" on invalid session id.
2. Validate username raise error message"Bad Login: username", if username is blank, contains white space or is dog.
3. When the username is not associated with session id raise error "No such user".
4. When user clicks to view details of item that does not exist, display message "Missing item".
5. When user adds empty comment display message "Text is required".
6. When user tries to add an item that already exists in shopping cart raise error message "Item already exists. But you can add more from View Cart"
7. When user tries to add an item, whose quantity is 0 (no stock),display message "No items left"
8. "Item does not exist" message is displayed when user tries to delete an item of cart, that is not present in cart
9. "Quantity should be more than zero" is displayed when user tries to decrease the quantity and make it 0 from view cart page
10. "No stock available" error message is raised when user tries to order more quantity of an item than available stock.
# ecom

Frontend: React(Vite) and TailwindCSS \
Backend: Node, Express and MongoDB

# Steps:

-> Clone the repo \
-> cd api -> npm install \
-> cd frontend -> npm install \
-> cd api -> nodemon index.js \
-> cd frontend -> npm run dev

# Functionalities:

1) Products from FakeStore API
2) Add multiple products to the cart
3) Checkout and the cart data gets stored on database
4) Sign In and Register a user account
5) JWT tokens implemented with cookies
6) Responsive UI design

# Postman endpoints:

1) http://localhost:5000/users 
2) http://localhost:5000/products 
3) http://localhost:5000/cart 

# IMP:

User data and Orders data is stored over MongoDB and MongoURL is there in .env \
JWT secret is also there on .env \
Make sure that the frontend url is http://localhost:5000/ so as to support CORS policy

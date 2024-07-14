# Book Heaven

Book Heaven is a web application that allows users to browse books, see book details , purchase books after logging in, add books to their cart and favorites, and check order status. Admins have special functionalities to manage books and user orders and regular order updates on Email.

## Features

### User Features
- View book details with prices
- Registration using OTP verification on email
- Order books after logging in
- Add books to cart
- Add books to favorites
- View order status
- Get order related email

### Admin Features
- View user orders and data
- Update user orders
- Add new books
- Delete books
- Update existing books

## Technologies Used
- **Frontend:** React.js
- **State Management:** Redux Toolkit
- **Authentication:** JWT Tokens
- **Notifications:** Toastify
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Responsive Design:** Mobile-friendly design
- **Nodemailer:** Get Order related email

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Anujpal05/BookHeaven.git
    ```
2. Navigate to the project directory:
    ```bash
    cd BookHeaven
    ```
3. Install dependencies for the frontend and backend:
    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```
4. Create a `.env` file in the `server` directory and add your environment variables:
    ```env
    MONGO_URL=your_mongo_db_uri
    SECRET_KEY=your_jwt_secret
    ```
5. Start the backend server:
    ```bash
    cd server
    npm start
    ```
6. Start the frontend server:
    ```bash
    cd client
    npm start
    ```

## Usage

- Register or log in to your account to start purchasing books.
- Browse through the collection of books and add your favorites to the cart.
- Admins can log in to access the admin panel for managing books and user orders.

---

Thank you for using BookHeaven! Enjoy your reading!

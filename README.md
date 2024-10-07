# MERN Stack CRUD Operations Example

This is a simple example demonstrating CRUD (Create, Read, Update, Delete) operations using the MERN stack. Where I build a basic application to manage user and employee for DealsDray.

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js and npm(node package manager)
- MongoDB

## Installation

1. Clone this repository:

    ```bash
    git clone <repository_url>
    ```

2. Install server dependencies:

    ```bash
    npm install
    ```

4. Install client dependencies:

    ```bash
    cd ../client
    npm install
    ```

## Usage

1. Start the server:

    ```bash
    npm run dev
    ```

2. Start the client:

    ```bash
    cd ../client
    npm run dev
    ```

3. Open your browser and go to `http://localhost:5173/` to view the application.

## Endpoints

### Users API

#### POST /auth/register

- Description: Register a new user
- Request Body: User registration details (JSON)
- Response: Newly registered user object

#### POST /auth/login

- Description: Login a user
- Request Body: User login credentials (JSON)
- Response: Authentication token and user details

#### POST /auth/logout

- Description: Logout a user
- Response: Success message

### User API

#### PUT /users/update/:id

-- Description: Update the user's profile
-- Response: Success message

#### DELETE /users/delete/:id

-- Description: Delete the user's profile
-- Response: Success message

### Employee API

#### GET /employees

- Description: Get all employees
- Response: Array of user objects

#### GET /employees/:id

- Description: Get a single user by ID
- Parameters:
  - `id`: User ID
- Response: User object

#### POST /employees/new

- Description: Create a new user
- Request Body: User object (JSON)
- Response: Newly created user object

#### PUT /employees/:id

- Description: Update an existing Employee
- Parameters:
  - `id`: Employee ID
- Request Body: Updated Employee object (JSON)
- Response: Updated Employee object

#### DELETE /employees/:id

- Description: Delete a Employee by ID
- Parameters:
  - `id`: Employee ID
- Response: Success message

## Frontend

The frontend is built with React.js and styled with TailwindCSS. It provides a simple user interface to perform CRUD operations on user data.

## Backend

The backend is built with Node.js and Express.js. It provides RESTful APIs to interact with the MongoDB database.

## Database

This application uses MongoDB as its database to store user data. Make sure MongoDB is running locally on your machine.

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue if you find any bugs or want to suggest improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
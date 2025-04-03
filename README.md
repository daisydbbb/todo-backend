### TODO LIST APP(Backend)

This backend project uses Node.js, Express and MongoDB <br>
JWT(JSON Web Token) is used for authentication

## Instructions to Setup and Run the application locally

### Clone the backend repo

Click on the green "Code" button <br>
Copy repo link: `https://github.com/yourusername/todo-backend.git` <br>
In your local terminal: <br>
`git clone https://github.com/yourusername/todo-backend.git`
`cd todo-backend`

### Install dependencies

`npm install`

### Configure environment variables

Create a .env file in the root: <br>
`PORT=5001`<br>
`MONGO_URI=mongodb://localhost:27017/todoapp`<br>
`JWT_SECRET=your_jwt_secret`<br>

### Start the server

`npm start`<br>
Your backend will be running at: http://localhost:5001

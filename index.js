const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./router/UserRoute');
const todo = require('./router/todoRoute');

const app = express();
require('dotenv').config();

// Body-parser middleware
app.use(bodyParser.json());
require('./DB/DBconnection')

app.use("/user",userRouter)
app.use("/todo",todo)


// Set up server
const port = process.env.PORT || 8001;
app.listen(port, () => console.log(`Server running on port ${port}`));

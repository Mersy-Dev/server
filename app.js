const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const colors = require('colors')

const mongoose = require('mongoose');
const cors = require('cors')
// require('dotenv/config');
const dotenv = require('dotenv').config();
const app = express();


// app.use(cors());
// app.option('*', cors());


// ROUTES 
const productRouter = require('./router/productRoute');
const categoryRouter = require('./router/categoryRoute');
const userRouter = require('./router/userRoute');
const orderRouter = require('./router/orderRoute');

const connectDB = require('./config/dbconnect')

//middle ware
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(express.json());
app.use(cors({origin:"*"}));
app.use(morgan('tiny'));





//Routers
const api = process.env.API_URL;

app.use(`${api}/products`, productRouter);
app.use(`${api}/category`, categoryRouter);
// app.use(`${api}/user`, userRouter);
// app.use(`${api}/order`, orderRouter);


//http://localhost:3000/api/v1/users


// mongoose.connect(process.env.MONGODB_URL)
// .then(() => {
//     console.log("Database Connected");
// }).catch(err => {
//     console.log(err);
// });




// app.listen(3000, ()=>{
//     console.log("server started on port http://localhost:3000");
// })


connectDB();


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server is running on ${port}`))
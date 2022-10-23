const express = require ('express');
const bodyparser = require ('body-parser');
const morgan = require ('morgan');
const mongoose = require('mongoose');
const productRouter = require('./routers/Product') ;
const categoriesRouter = require('./routers/categories') ;
const usersRouter = require('./routers/users') ;
const ordersRouter = require('./routers/orders') ;
//const resetPasswordRouter = require('./routers/reset-password') ;
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');


const app = express();

require("dotenv/config");

const api = process.env.API_URL;

//Middleware
app.use(cors());
app.options('*',cors)
app.use(bodyparser.json());
app.use (morgan('tiny'));
app.use(authJwt());
// methode exécute lorsque ilya un probleme dans l'api
app.use(errorHandler);
app.use('/public/uploads',express.static(__dirname + '/public/uploads' ));

//routers
app.use(`${api}/products`,productRouter);
app.use(`${api}/categories`,categoriesRouter);
app.use(`${api}/users`,usersRouter);
app.use(`${api}/orders`,ordersRouter);
//app.use(`${api}/reset-password`,resetPasswordRouter);

mongoose.connect(process.env.CONNECT_DB,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log('database connection is ready ...');
})
.catch((err)=>{
    console.log("database connection is failed ....");
})

app.listen(3000,()=>{
    console.log("server is running http://localhost:3000 ");
})


const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const api = process.env.API_URL;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Product = require('./models/product');


//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));


//Routers
const productsRouter = require('./routers/products');
const categoriesRouter = require('./routers/categories');
const usersRouter = require('./routers/users');
const ordersRouter = require('./routers/orders');


app.use(`${api}/products`, productsRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, usersRouter);





mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop'

}
).then(() => {
    console.log('Database connecion is ready...')
}).catch((err) => {
    console.log(err)
})


app.listen(PORT, () => {
    console.log(`server is running at PORT ${PORT} `);
    console.log(api);
});


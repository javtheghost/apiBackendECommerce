const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const dbConnect = require('./config/dbConnect');
const morgan = require("morgan");
//rutas
const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productRoute');
const blogRouter = require('./routes/blogRoute');
const categoryRouter = require('./routes/categoryRoute');
const blogCategoryRouter = require('./routes/blogCategoryRoute');
const brandRouter = require('./routes/brandRoute');
const couponRouter = require('./routes/couponRoute');






const { notFound, errorHandler } = require('./middlewares/errorHandler');
require("dotenv").config(); //para hacer variables custom instalar dependeica npm i dotenv
const app = express();
const PORT = process.env.PORT || 9000;
dbConnect();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
app.use('/api/user',authRouter);
app.use('/api/product', productRouter);
app.use('/api/blog', blogRouter);
app.use('/api/category', categoryRouter);
app.use('/api/blogcategory', blogCategoryRouter);
app.use('/api/brand', brandRouter);
app.use('/api/coupon', couponRouter);







app.use(notFound);
app.use(errorHandler);






app.get("/",(req, res) =>
{
  res.send("Bienvenido a mi API");

});
app.use("/", (req, res) =>{
  res.send("Hello desde el server");
});
app.listen(PORT, () => {
  console.log(`!Conexión satisfactoria! \nServer corriendo en el puerto ${PORT}`);
});

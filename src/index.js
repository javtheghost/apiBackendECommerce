const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const dbConnect = require('./config/dbConnect');

//rutas
const authRouter = require('./routes/authRoute');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
require("dotenv").config(); //para hacer variables custom instalar dependeica npm i dotenv
const app = express();
const PORT = process.env.PORT || 9000;
dbConnect();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
app.use('/api/user',authRouter);
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

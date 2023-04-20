const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const multer = require('multer');
const cors = require('cors')
const res = require('express/lib/response');
//rutas
const authRouter = require('./routes/authRoute');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
require("dotenv").config(); //para hacer variables custom instalar dependeica npm i dotenv
const app = express();
const port = process.env.PORT || 9000;



app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/user',authRouter);

app.use(notFound);
app.use(errorHandler);






app.get("/",(req, res) =>
{
  res.send("Bienvenido a mi API");

});


mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('Se ha conectado a base de datos satisfacotoriamente'))
.catch((error) => console.error(error));
app.listen(port, () => console.log('sever listening on port', port));
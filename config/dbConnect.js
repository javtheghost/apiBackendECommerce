const {default: mongoose} = require("mongoose");
const dbConnect = () =>{
    try {
        const conn = mongoose.connect(process.env.MONGODB_URI);
    }catch(error){
        console.log("Error de conexion base de datos")
    }
}   
module.exports = dbConnect;
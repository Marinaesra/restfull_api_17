const PORT = 3000;
const express = require('express');
const userRouter = require('./routers/userRouter');
const connectToDatabase =  require ('./db/connectDb')

require("dotenv").config();
 
const app = express();
app.use(express.json());
 
connectToDatabase();
app.use('/api/user', userRouter)

 
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
 
 
// GET -> GET PARA OBTENER RECURSOS -> find
// POST -> POST PARA CREAR RECURSOS -> create
// PUT -> PUT PARA ACTUALIZAR RECURSOS -> updateOne
// DELETE -> DELETE PARA ELIMINAR RECURSOS -> deteleOne
// PATCH -> PATCH PARA ACTUALIZAR PARCIALMENTE RECURSOS -> updateOne
const PORT = 3000;
const express = require('express');
const userRouter = require('./routers/userRouter');
const connectToDatabase =  require ('./db/connectDb')
const movieRouter = require('./routers/movieRouter')
const loginRouter = require('./routers/loginRouter');
/*const cors = require("cors");
const cron = require ("node-cron")*/

//const connectToDatabase = require('./db/connectDb')

require("dotenv").config();
require('./jobs/emailCronJob');


 
const app = express();
//app.use (cors());
app.use(express.json());
 
//connectToDatabase();

app.use('/api/user', userRouter)
app.use('/api/movies', movieRouter)
app.use("/api/auth", loginRouter)

 
/*app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});*/

module.exports = app;
 
/*cron.schedule("35 18 1 * 7", async () => {
  console.log("Ejecutando tarea programada")
});
 
// * * * * *
// │ │ │ │ │
// │ │ │ │ └─ Día de la semana (0 - 7) (0 o 7 = Domingo)
// │ │ │ └─── Mes (1 - 12)
// │ │ └───── Día del mes (1 - 31)
// │ └─────── Hora (0 - 23)
// └───────── Minuto (0 - 59)*/
 
 
// GET -> GET PARA OBTENER RECURSOS -> find
// POST -> POST PARA CREAR RECURSOS -> create
// PUT -> PUT PARA ACTUALIZAR RECURSOS -> updateOne
// DELETE -> DELETE PARA ELIMINAR RECURSOS -> deteleOne
// PATCH -> PATCH PARA ACTUALIZAR PARCIALMENTE RECURSOS -> updateOne
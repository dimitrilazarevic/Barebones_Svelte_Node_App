const express = require('express');
const mongoose = require ('mongoose');
const cors = require('cors');
const {PORT,MONGO_URI} = require ('./config_back.js')
const userRoutes = require('./routes/user_routes.js')

const app = express();
app.use(cors())
app.use(express.json());
app.use('/api/user/',userRoutes);
app.listen(PORT,()=>console.log("Connecté au port "+PORT+" capitaine !"))

mongoose
    .connect(MONGO_URI)
    .then(
        ()=>console.log("DB opérationnelle !"),
        ()=>console.log("La connexion à la DB a échoué !")
    )

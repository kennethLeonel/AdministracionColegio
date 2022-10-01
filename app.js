
//Con Deno
// import { Application } from "https://deno.land/x/oak/mod.ts";

// const app = new Application();

// app.use((ctx) => {
//   ctx.response.body = "Hello World!";
// });

// imports
const express = require ('express')
const app = express()

const path  = require('path');
const rutaAdmin = require ('./routes/administradorRouter')
const rutaIndex = require ('./routes/indexRouter')
app.use(express.static(path.join(__dirname, 'public')));
// se utiliza el motor ejs
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')



//middleware
app.use(express.urlencoded ({extended: false}));
app.use(express.json());


//Rutas
app.use('/',rutaIndex);
app.use ('/administrador', rutaAdmin);





app.listen( 8081, ()=>{
    console.log('se levanto en "http://localhost:8081"')
})









//Con Deno
// import { Application } from "https://deno.land/x/oak/mod.ts";

// const app = new Application();

// app.use((ctx) => {
//   ctx.response.body = "Hello World!";
// });

// imports
const express = require ('express')
const app = express()
const methodOverride = require('method-override');
const path  = require('path');
const rutaAdmin = require ('./routes/administradorRouter')
const rutaIndex = require ('./routes/indexRouter')


app.use(express.static(path.join(__dirname, 'public')));
// se utiliza el motor ejs
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.use(methodOverride('_method')); 
//middleware
app.use(express.urlencoded ({extended: false}));
app.use(express.json());


//Rutas
app.use('/',rutaIndex);
app.use ('/administrador', rutaAdmin);




const port = process.env.PORT || 8081;
app.listen( port, ()=>{
    console.log(`se levanto en http://localhost:${port}`)
})








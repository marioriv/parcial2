// ## Agrega la dependencia de express ##
var express = require('express');
//Morgan para ver los gets y posts
var morgan = require('morgan');

var animals = [
   {
     animalType: "dog",
     pet: true,
     fierceness: 4
   }, {
     pet: true,
     fierceness: 10
   }, {
     animalType: "giraffe",
     pet: false,
     fierceness: 4
   }, {
     animalType: "zebra",
     pet: false,
     fierceness: 8
   }, {
     animalType: "lion",
     pet: false,
     fierceness: 10
   }
 ];


// ## Inicializa express ##
var app = express();
// Middleware de morgan
app.use(morgan('dev'));


// ## Inicializa el motor de plantillas con EJS ##
app.set('view engine', 'ejs'); 

// ## Agrega el middleware de express para que el servidor soporte json ##
app.use(express.json());


/* ############## RUTAS ################  */

/* (1)  Crea una ruta GET que: 
   - escuche en /all-pets  
   - renderice la página 'pages/all-pets' y reciba 1 objeto con 2 propiedades: 
      a) title:  con el valor "All" 
      b) animals: con referencia al arreglo animals. 
*/
app.get('/all-pets', (req, res) => {
  res.render('pages/all-pets', {title: "ALL", animals})
});

/* (2)  Crea una ruta POST que: 
   - escuche en /api/addAnimal 
   - obtenga el valor recibido del body
   - lo agregue al arreglo animals

*/
app.post('/api/addAnimal', (req,res) => {
  newAnimal = req.body;
  animals.push(newAnimal);
  res.send(animals[animals.length - 1]);
})

/* (3)  Crea una ruta GET que: 
   - escuche en /dog  
   - renderice la página 'pages/dog' y reciba 1 objeto con 2 propiedades: 
      a) title:  con el valor "Dog" 
      b) dog: con el valor del indice[0]
*/

app.get('/dog', (req,res) => {
  dog = animals[0]
  res.render('pages/dog', {title: "Dog", dog})
});

/* (4)  Crea una ruta GET que: 
   - escuche en /api/getAnimal/:animal
   - obtenga el valor de la ruta dinámica
   - Realice una busqueda en el arreglo 'animals' vs el valor dinámico.
   - Si hay coincidencia almacena ese objeto en alguna variable
   - renderice la página 'pages/any' y reciba 1 objeto con 2 propiedades: 
      a) title:  con el valor obtenido de la ruta dinámica
      b) animal: con la variable que almacena el objeto encontrado. Si no lo encuentra la variable se va vacía
*/ 
app.get('/api/getAnimal/:animal', (req, res) => {
  var animal = req.params.animal;
  var hold

  animals.forEach(a => {
    if(a.animalType == animal){
      hold = a;
    } 
  })
  res.render('pages/any', {title: animal, animal: hold});
})


//  Agrega el código necesario para que el servidor escuche en el puerto 5000
var PORT = 5000
app.listen(PORT, () =>{
  console.log(`Server on port ${PORT}`)
})


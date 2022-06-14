var express = require('express');
var app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

var myDataAlumnos = [
    { ID: '1', Nombre_Estudiante: 'Homero Simpson', Categoria: 'Computers', Edad: 10 },
    { ID: '2', Nombre_Estudiante: 'Bart Simpson', Categoria: 'Programming', Edad: 20 },
    { ID: '3', Nombre_Estudiante: 'Marjory A.', Categoria: 'Science', Edad: 35 }
]

var myDataCursos = [
    { ID: '1', Nombre_Curso: 'Computer Architecture', Categoria: 'Computers', Cupos: 10 },
    { ID: '2', Nombre_Curso: 'Asp.Net 4 Blue skys', Categoria: 'Programming', Cupos: 20 },
    { ID: '3', Nombre_Curso: 'Popular Science', Categoria: 'Science', Cupos: 35 },
    { ID: '4', Nombre_Curso: 'Popular Science II', Categoria: 'Science', Cupos: 20 }
]

app.get("/Alumnos", (req, res, next) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(myDataAlumnos));  
    res.end();
});

app.get("/Cursos", (req, res, next) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = JSON.stringify(myDataCursos);
    res.write(data);
    res.end();
});

app.listen(port, () => { console.log('Server running on port ' + port); });
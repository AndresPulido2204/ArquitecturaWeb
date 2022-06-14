var express = require("express");
var app = express();

var frases = ["Fase 1", "Fase 2", "Fase 3", "Fase 4", "Fase 5"]

app.get("/frases/random", function(req, res, next) {
    let f = frases[Math.floor(Math.random() * frases.length)];
    res.send(f)
});

app.get("/ops/mayor", function(req, res, next) {
    let num1 = req.query.num1
    let num2 = req.query.num2
    if (num1 > num2) {
        res.send(num1)
    }
    else if (num2 > num1) {
        res.send(num2)
    } else {
        res.send('Las cantidades son iguales' + num2 + num2)
    }
});

app.get('/users', function(req, res) {
    res.json({ users: 'allUsers' });
  });
  
  app.get('/users/3', function(req, res) {
    res.json({ user: 'user3' });
  });
  

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

module.exports = app;
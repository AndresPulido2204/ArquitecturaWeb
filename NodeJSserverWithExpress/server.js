var express = require("express");
var app = express();

app.get('/users', function (req, res) {
  res.json({ users: 'allUsers' });
});

app.get('/users/3', function (req, res) {
  res.json({ user: 'user3' });
});

var frases = ["Fase 1", "Fase 2", "Fase 3", "Fase 4", "Fase 5"]

app.get('/frases/random', function (req, res) {
  let f = frases[Math.floor(Math.random() * frases.length)];
  res.json({ Frase: f });
});

app.get("/ops/suma", function (req, res) {
  let num1 = req.query.num1
  let num2 = req.query.num2
  let sum = parseInt(num1) + parseInt(num2);
  res.json({ suma: sum});
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

module.exports = app;
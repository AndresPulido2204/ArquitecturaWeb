
function loadData() {
    var xhttp = new XMLHttpRequest();
    let idPersonaje = Math.floor(Math.random() * 82) + 1;

    xhttp.onprogress = function () {
        document.getElementById("inpstatus").innerText = "La petición está en progreso";
    };

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            let o = JSON.parse(this.responseText)
            addPersonaje(idPersonaje, o)
            document.getElementById("inpstatus").innerText = "La petición está completa.";
        }
    };

    //xhttp.open("GET", "https://swapi.dev/api/people/" + idPersonaje, true);
    xhttp.open("GET", "http://localhost:5000/data", true);
    xhttp.send();
}

function addPersonaje(id, o) {
    let ul = document.getElementById("lstPersonajes");
    let p = 'Id: ' + id + ', Nombre: ' + o.name

    let li = document.createElement("li");
    li.appendChild(document.createTextNode(p));
    li.setAttribute("id", id);
    ul.appendChild(li);
}
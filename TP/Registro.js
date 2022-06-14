var mdlLogin = 'mdlLogin';
var mdlABMs = 'mdlABMs';
var mdlReports = 'mdlReports';

function validateUser() {
    let u = document.getElementById('txtUser');
    let p = document.getElementById('txtPass');

    if (u.value == "admin" && u.value == p.value) {
        u.value = "";
        p.value = "";

        updateLoginStatus();
    }
    else {
        alert("Usuario o pass incorrecto, intenta 'admin' 'admin' ;)");
    }
}

function updateLoginStatus() {
    let modal = document.getElementById(mdlLogin);
    let btnSessionStatus = document.getElementById('btnSessionStatus');

    if (modal.style.display == "none") {
        btnSessionStatus.textContent = 'Iniciar sesión'
    }
    else {
        btnSessionStatus.textContent = 'Cerrar sesión'
    }

    changeModalStatus(mdlLogin);
}

function changeModalStatus(m) {
    let modal = document.getElementById(m);

    if (modal.style.display == "none") {
        modal.style.display = "block";
    }
    else {
        modal.style.display = "none";
    }
}

function OpentReportView() {
    testAPI();
    changeModalStatus(mdlReports);
}

function testAPI() {
    var xhttp = new XMLHttpRequest();

    let readyState = 4;
    let readyStatePass = false;
    let status = 200;
    let statusPass = false;
    let responseText = '';
    let responseTextPass = false;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            readyStatePass = (this.readyState == readyState);
            if (this.status == 200) {
                statusPass = (this.status == status);
                responseTextPass = (this.responseText != responseText);
                let o = JSON.parse(this.responseText)
            }
            GenerateReport(readyStatePass, statusPass, responseTextPass);
        }
    };

    //xhttp.open("GET", "https://swapi.dev/api/people/1", true);
    xhttp.open("GET", "http://localhost:3000/Alumnos", true);
    xhttp.send();
}


function GenerateReport(readyStatePass, statusPass, responseTextPass){

    const report = `readyState(4): ${readyStatePass} 
    \n status(200): ${statusPass}
    \n responseText(no empty): ${responseTextPass}`;

    var div = document.getElementById('ReportsContainer');
    div.innerText = report;
}

function openABM(tipo) {

    var data = [{}];

    switch (tipo) {
        case 'Alumnos':
            data = [
                { ID: '1', Nombre_Estudiante: 'Homero Simpson', category: 'Computers', Edad: 10 },
                { ID: '2', Nombre_Estudiante: 'Bart Simpson', category: 'Programming', Edad: 20 },
                { ID: '3', Nombre_Estudiante: 'Marjory A.', category: 'Science', Edad: 35 }
            ]
            break;
        case 'Cursos':
            data = [
                { ID: '1', Nombre_Curso: 'Computer Architecture', Categoria: 'Computers', Cupos: 10 },
                { ID: '2', Nombre_Curso: 'Asp.Net 4 Blue skys', Categoria: 'Programming', Cupos: 20 },
                { ID: '3', Nombre_Curso: 'Popular Science', Categoria: 'Science', Cupos: 35 },
                { ID: '4', Nombre_Curso: 'Popular Science II', Categoria: 'Science', Cupos: 20 }
            ]
            break;
    }

    updateTable(data);
}

function saveABMinLocalStorage() {
    window.localStorage.setItem('MyJsonData', JSON.stringify(crudApp.myData));
    alert("Informacion guardada en Local Storage");
}

function loadABMinLocalStorage() {
    JSON.parse(window.localStorage.getItem('MyJsonData'));
}

function updateTable(JsonData) {
    crudApp.myData = [{}];
    crudApp.myData = JsonData;
    crudApp.createTable();
    changeModalStatus(mdlABMs);
}

function closeABM(mdl) {
    changeModalStatus(mdl);
}

var crudApp = new function () {

    this.myData = [{}]

    this.createTable = function () {

        // An array of JSON objects with values. Demo Data
        this.category = ['Business', 'Computers', 'Programming', 'Science'];
        this.col = [];

        // Extract value for table header.
        for (var i = 0; i < this.myData.length; i++) {
            for (var key in this.myData[i]) {
                if (this.col.indexOf(key) === -1) {
                    this.col.push(key);
                }
            }
        }

        // CREATE A TABLE.
        var table = document.createElement('table');
        table.setAttribute('id', 'myTable');     // Set table id.

        var tr = table.insertRow(-1);               // Create a row (for header).

        for (var h = 0; h < this.col.length; h++) {
            // Add table header.
            var th = document.createElement('th');
            th.innerHTML = this.col[h].replace('_', ' ');
            tr.appendChild(th);
        }

        // Add rows using JSON data.
        for (var i = 0; i < this.myData.length; i++) {

            tr = table.insertRow(-1);           // Create a new row.

            for (var j = 0; j < this.col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = this.myData[i][this.col[j]];
            }

            // Dynamically create and add elements to table cells with events.

            this.td = document.createElement('td');

            // *** CANCEL OPTION.
            tr.appendChild(this.td);
            var lblCancel = document.createElement('label');
            lblCancel.innerHTML = '✖';
            lblCancel.setAttribute('onclick', 'crudApp.Cancel(this)');
            lblCancel.setAttribute('style', 'display:none;');
            lblCancel.setAttribute('title', 'Cancel');
            lblCancel.setAttribute('id', 'lbl' + i);
            this.td.appendChild(lblCancel);

            // *** SAVE.
            tr.appendChild(this.td);
            var btSave = document.createElement('input');

            btSave.setAttribute('type', 'button');      // SET ATTRIBUTES.
            btSave.setAttribute('value', 'Save');
            btSave.setAttribute('id', 'Save' + i);
            btSave.setAttribute('style', 'display:none;');
            btSave.setAttribute('onclick', 'crudApp.Save(this)');       // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btSave);

            // *** UPDATE.
            tr.appendChild(this.td);
            var btUpdate = document.createElement('input');

            btUpdate.setAttribute('type', 'button');    // SET ATTRIBUTES.
            btUpdate.setAttribute('value', 'Update');
            btUpdate.setAttribute('id', 'Edit' + i);
            btUpdate.setAttribute('style', 'background-color:#44CCEB;');
            btUpdate.setAttribute('onclick', 'crudApp.Update(this)');   // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btUpdate);

            // *** DELETE.
            this.td = document.createElement('th');
            tr.appendChild(this.td);
            var btDelete = document.createElement('input');
            btDelete.setAttribute('type', 'button');    // SET INPUT ATTRIBUTE.
            btDelete.setAttribute('value', 'Delete');
            btDelete.setAttribute('style', 'background-color:#ED5650;');
            btDelete.setAttribute('onclick', 'crudApp.Delete(this)');   // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btDelete);
        }


        // ADD A ROW AT THE END WITH BLANK TEXTBOXES AND A DROPDOWN LIST (FOR NEW ENTRY).

        tr = table.insertRow(-1);           // CREATE THE LAST ROW.

        for (var j = 0; j < this.col.length; j++) {
            var newCell = tr.insertCell(-1);
            if (j >= 1) {

                if (j == 2) {   // WE'LL ADD A DROPDOWN LIST AT THE SECOND COLUMN (FOR Category).

                    var select = document.createElement('select');      // CREATE AND ADD A DROPDOWN LIST.
                    select.innerHTML = '<option value=""></option>';
                    for (k = 0; k < this.category.length; k++) {
                        select.innerHTML = select.innerHTML +
                            '<option value="' + this.category[k] + '">' + this.category[k] + '</option>';
                    }
                    newCell.appendChild(select);
                }
                else {
                    var tBox = document.createElement('input');          // CREATE AND ADD A TEXTBOX.
                    tBox.setAttribute('type', 'text');
                    tBox.setAttribute('value', '');
                    newCell.appendChild(tBox);
                }
            }
        }

        this.td = document.createElement('td');
        tr.appendChild(this.td);

        var btNew = document.createElement('input');

        btNew.setAttribute('type', 'button');       // SET ATTRIBUTES.
        btNew.setAttribute('value', 'Create');
        btNew.setAttribute('id', 'New' + i);
        btNew.setAttribute('style', 'background-color:#207DD1;');
        btNew.setAttribute('onclick', 'crudApp.CreateNew(this)');       // ADD THE BUTTON's 'onclick' EVENT.
        this.td.appendChild(btNew);

        var div = document.getElementById('containerABM');
        div.innerHTML = '';
        div.appendChild(table);    // ADD THE TABLE TO THE WEB PAGE.
    };

    // ****** OPERATIONS START.

    // CANCEL.
    this.Cancel = function (oButton) {

        // HIDE THIS BUTTON.
        oButton.setAttribute('style', 'display:none; float:none;');

        var activeRow = oButton.parentNode.parentNode.rowIndex;

        // HIDE THE SAVE BUTTON.
        var btSave = document.getElementById('Save' + (activeRow - 1));
        btSave.setAttribute('style', 'display:none;');

        // SHOW THE UPDATE BUTTON AGAIN.
        var btUpdate = document.getElementById('Edit' + (activeRow - 1));
        btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#44CCEB;');

        var tab = document.getElementById('myTable').rows[activeRow];

        for (i = 0; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            td.innerHTML = this.myData[(activeRow - 1)][this.col[i]];
        }
    }


    // EDIT DATA.
    this.Update = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('myTable').rows[activeRow];

        // SHOW A DROPDOWN LIST WITH A LIST OF CATEGORIES.
        for (i = 1; i < 4; i++) {
            if (i == 2) {
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('select');      // DROPDOWN LIST.
                ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
                for (k = 0; k < this.category.length; k++) {
                    ele.innerHTML = ele.innerHTML +
                        '<option value="' + this.category[k] + '">' + this.category[k] + '</option>';
                }
                td.innerText = '';
                td.appendChild(ele);
            }
            else {
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('input');      // TEXTBOX.
                ele.setAttribute('type', 'text');
                ele.setAttribute('value', td.innerText);
                td.innerText = '';
                td.appendChild(ele);
            }
        }

        var lblCancel = document.getElementById('lbl' + (activeRow - 1));
        lblCancel.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position: absolute;');

        var btSave = document.getElementById('Save' + (activeRow - 1));
        btSave.setAttribute('style', 'display:block; margin-left:30px; float:left; background-color:#2DBF64;');

        // HIDE THIS BUTTON.
        oButton.setAttribute('style', 'display:none;');
    };


    // DELETE DATA.
    this.Delete = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        this.myData.splice((activeRow - 1), 1);    // DELETE THE ACTIVE ROW.
        this.createTable();                         // REFRESH THE TABLE.
    };

    // SAVE DATA.
    this.Save = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('myTable').rows[activeRow];

        // UPDATE myData ARRAY WITH VALUES.
        for (i = 1; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {  // CHECK IF ELEMENT IS A TEXTBOX OR SELECT.
                this.myData[(activeRow - 1)][this.col[i]] = td.childNodes[0].value;      // SAVE THE VALUE.
            }
        }
        this.createTable();     // REFRESH THE TABLE.
    }

    // CREATE NEW.
    this.CreateNew = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('myTable').rows[activeRow];
        var obj = {};

        // ADD NEW VALUE TO myData ARRAY.
        for (i = 1; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {      // CHECK IF ELEMENT IS A TEXTBOX OR SELECT.
                var txtVal = td.childNodes[0].value;
                if (txtVal != '') {
                    obj[this.col[i]] = txtVal.trim();
                }
                else {
                    obj = '';
                    alert('all fields are compulsory');
                    break;
                }
            }
        }
        obj[this.col[0]] = this.myData.length + 1;     // NEW ID.

        if (Object.keys(obj).length > 0) {      // CHECK IF OBJECT IS NOT EMPTY.
            this.myData.push(obj);             // PUSH (ADD) DATA TO THE JSON ARRAY.
            this.createTable();                 // REFRESH THE TABLE.
        }
    }
}
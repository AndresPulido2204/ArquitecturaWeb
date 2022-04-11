
function funRegistrar() {
    let inpValor = +document.getElementById("inpValor").value;

    if (inpValor === 0 || isNaN(inpValor)) {
        alert("Ingrese un numero diferente de 0");
        document.getElementById("inpValor").focus();
    } else {

        let { inpTotal, inpCantidad, inpMayor, inpMenor, inpPromedio } = TomarValores();
        actualizarValores(inpTotal, inpCantidad, inpMayor, inpMenor, inpPromedio);
    }

    function TomarValores() {
        let inpCantidad = document.getElementById("inpCantidad");
        let inpPromedio = document.getElementById("inpPromedio");
        let inpMayor = document.getElementById("inpMayor");
        let inpMenor = document.getElementById("inpMenor");
        let inpTotal = document.getElementById("inpTotal");
        return { inpTotal, inpCantidad, inpMayor, inpMenor, inpPromedio };
    }

    function actualizarValores(inpTotal, inpCantidad, inpMayor, inpMenor, inpPromedio) {
        inpTotal.value = +inpTotal.value + inpValor;
        inpCantidad.value = +inpCantidad.value + 1;

        verificarMaximo(inpMayor);
        verificarMinimo(inpMenor);

        inpPromedio.value = +inpTotal.value / +inpCantidad.value;
    }

    function verificarMaximo(inpMayor) {
        if (inpValor >= +inpMayor.value || +inpMayor.value === 0) {
            inpMayor.value = inpValor;
        }
    }

    function verificarMinimo(inpMenor) {
        if (inpValor <= +inpMenor.value || +inpMenor.value === 0) {
            inpMenor.value = inpValor;
        }
    }
}
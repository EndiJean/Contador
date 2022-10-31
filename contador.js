function carregarHora() {
    if (localStorage.getItem('nomeItem') == null) {
        esconderCampo('hora');
        esconderCampo('campoInicial');
        esconderCampo('campoParar');
    } else {
        if (localStorage.getItem('horaInicial') == null) {
            esconderCampo('campoParar');
            montarTelaIniciar();
        } else {
            if (localStorage.getItem('horaFinal') == null) {
                montarTelaParar();
            } else {
                if (localStorage.getItem('horaFinal') > localStorage.getItem('horaInicial')) {
                    mostrarCampo('campoInicial');
                    esconderCampo('campoParar');
                    montarTelaIniciar();
                    //Mostra as horas gastas;
                    var hora = window.document.querySelector('div#hora')
                    hora.innerHTML = `<p><strong>${converterHora(localStorage.getItem('tempoGasto'))}</strong></p>`;
                } else {
                    montarTelaParar();
                }
            }
        }
    }
}

function botaoConfirmar() {
    if (document.getElementById("campoTexto").value.length < 1 && document.getElementById('botaoConfirmar').value == "Confirmar") {
        alert('Por favor, preencha o campo');
        document.getElementById("campoTexto").focus();
    } else {
        if (document.getElementById('botaoConfirmar').value == "Confirmar" && localStorage.getItem('nomeItem') == null) {
            esconderCampo('camposIndex');
            //Pega o valor do input(nome do item);
            var item = window.document.querySelector('#campoTexto');
            var itemNome = item.value;

            salvarLocalStorage('nomeItem', itemNome);

            mostrarCampo('campoInicial');
            montarTelaIniciar();

        } else if (document.getElementById('botaoConfirmar').value == "Iniciar") {
            var inicio = window.document.querySelector('#horaInicial');
            var horaInicial = inicio.value;
            if (horaInicial != null && horaInicial.length > 1) {
                if (validaHora(horaInicial)) {
                    salvarLocalStorage('horaInicial', adicionaPonto(horaInicial));
                    mostrarCampo('campoParar');
                    limparCampo('horaInicial');

                    montarTelaParar();
                } else {
                    alert('Informe um horario valido.\nEx.: (1600)');
                }
            } else {
                salvarLocalStorage('horaInicial', data());
                mostrarCampo('campoParar');
                limparCampo('horaInicial');

                montarTelaParar();
            }

        } else if (document.getElementById('botaoConfirmar').value == "Parar") {
            var final = window.document.querySelector('#horaFinal');
            var horaFinal = final.value;

            var validacao = false;

            if (horaFinal != null && horaFinal > 1) {
                if (validaHora(horaFinal)) {
                    salvarLocalStorage('horaFinal', adicionaPonto(horaFinal));
                    validacao = true;
                } else {
                    alert('Informe um horario valido.\nEx.: (1600)');
                }
            } else {
                salvarLocalStorage('horaFinal', data());
                validacao = true;
            }

            if (validacao) {

                // pega hora incial e final e retorna a hora total;
                var horaTotal = calcularHora(localStorage.getItem('horaInicial'), localStorage.getItem('horaFinal'))

                //salva a hora final na localStorage;
                salvarLocalStorage('horaTotal', horaTotal);

                //Pega o ultimo valor gasto registrado;
                var getTempoGasto = new Number(localStorage.getItem('tempoGasto'));

                // soma o ultimo valor gasto com o atual;
                var tempoGasto = soma(parseInt(getTempoGasto), horaTotal);
                salvarLocalStorage('tempoGasto', tempoGasto);

                //Muda o botao pra iniciar;
                mudarNomeBotao('Iniciar');

                mostrarCampo('hora');
                mostrarCampo('campoInicial');
                esconderCampo('campoParar');

                limparCampo('horaFinal');

                //Mostra as horas gastas;
                var hora = window.document.querySelector('div#hora')
                hora.innerHTML = `<p><strong>${converterHora(tempoGasto)}</strong></p>`;
            }
        }
    }
}

function montarTelaIniciar() {

    var nome = localStorage.getItem('nomeItem');

    //Setta o nome do h1 como o nome do item;
    window.document.querySelector('#titulo').innerHTML = nome;

    //muda o nome do botao para iniciar;
    mudarNomeBotao('Iniciar');

    esconderCampo('camposIndex');
}

function montarTelaParar() {
    esconderCampo('hora');
    esconderCampo('campoInicial');
    montarTelaIniciar();

    //Muda o nome do botao para parar;
    mudarNomeBotao('Parar');
}

/*
/ Muda o nome dos botões
*/
function mudarNomeBotao(nome) {
    document.getElementById('botaoConfirmar').value = nome;
}

/*
/ Salva a key e o value no localStorage
*/
function salvarLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

/*
/ Esconde input da tela inicial
*/
function esconderCampo(nomeCampo) {
    document.getElementById(nomeCampo).style.display = "none";
    document.getElementById(nomeCampo).style.textAlign = "center";
}
/*
/ Mostra input da tela inicial
*/
function mostrarCampo(nomeCampo) {
    document.getElementById(nomeCampo).style.display = "block";
}

function limparCampo(nomeCampo) {
    document.getElementById(nomeCampo).value = '';
}

function adicionaPonto(hora) {
    var horas = hora.slice(0, 2);
    var minutos = hora.slice(2, 4);
    return horas + ':' + minutos;
}

/*
/ Recebe um numero e compara se ele tem duas casas,
/ Se não, adiciona zero a esquerda;
*/
function addZeroes(num) {
    var numberWithZeroes = String(num);
    var counter = numberWithZeroes.length;

    while (counter < 2) {
        numberWithZeroes = "0" + numberWithZeroes;
        counter++;
    }
    return numberWithZeroes;
}

/*
/ Retorna a hora e minuto atual do Sistema;
*/
function data() {
    let d = new Date();
    return addZeroes(d.getHours()) + ":" + addZeroes(d.getMinutes());
}

/*
/ Valida se é um horario valido;
*/
function validaHora(hora) {
    var horas = hora.slice(0, 2);
    var minutos = hora.slice(2, 4);

    if (hora.length != 4) {
        // Verifica se é uma hora valida;
        if (horas < 00 || horas > 24) {
            return false;
        }

        // Verifica se é minuto valid0;
        if (minutos < 00 || minutos > 60) {
            return false;
        }
        return false;
    }

    return true;
}

function soma(n1 = 0, n2 = 0) {
    return parseInt(n1) + parseInt(n2);
}

/*
/ Recebe um numero em minutos e converte para hora;
*/
function converterHora(minutos) {
    var min = minutos % 60;
    var hora = (minutos - min) / 60;
    return addZeroes(hora) + ':' + addZeroes(min);
}

function confirmar(texto, callback1, callback2) {
    var confirmacao = confirm(texto);
    if (confirmacao) {
        callback1();
    } else {
        callback2();
    }
}

function apagarDados() {
    confirmar(
        "Deseja apagar os dados do Item?",
        function() {
            localStorage.clear();
            window.location.reload(true);
        },
        function() {}
    )
}

function dividirString(texto, separador) {
    var array = texto.split(separador);
    return array;
}

function tiraPontoHora(texto, separador) {
    var array = texto.split(separador);
    return array[0] + array[1];
}

function converterMinutos(n1) {
    return parseInt((dividirString(n1, ':')[0]) * 60) + parseInt(dividirString(n1, ':')[1]);
}

function calcularHora(n1, n2) {
    var total = converterMinutos(n2) - converterMinutos(n1);
    return addZeroes(total);
}
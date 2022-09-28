function carregarHora() {
    if (localStorage.getItem('nomeItem') == null) {
        esconderCampoHora();
    } else {
        if (localStorage.getItem('horaInicial') == null) {
            montarTelaIniciar();
        } else {
            if (localStorage.getItem('horaFinal') == null) {
                montarTelaParar();
            } else {
                if (localStorage.getItem('horaFinal') > localStorage.getItem('horaInicial')) {
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
            esconderCampoPesquisa();
            //Pega o valor do input(nome do item);
            var item = window.document.querySelector('#campoTexto');
            var itemNome = item.value;

            salvarLocalStorage('nomeItem', itemNome);

            montarTelaIniciar();

        } else if (document.getElementById('botaoConfirmar').value == "Iniciar") {
            salvarLocalStorage('horaInicial', data());

            montarTelaParar();
        } else if (document.getElementById('botaoConfirmar').value == "Parar") {
            salvarLocalStorage('horaFinal', data());

            // pega hora incial e final e retorna a hora total;
            var horaInicial = localStorage.getItem('horaInicial');
            var horaFinal = localStorage.getItem('horaFinal');
            var horaTotal = horaFinal - horaInicial;

            //salva a hora final na localStorage;
            salvarLocalStorage('horaTotal', horaTotal);

            //Pega o ultimo valor gasto registrado;
            var getTempoGasto = new Number(localStorage.getItem('tempoGasto'));

            // soma o ultimo valor gasto com o atual;
            var tempoGasto = soma(getTempoGasto, horaTotal);
            salvarLocalStorage('tempoGasto', tempoGasto);

            //Muda o botao pra iniciar;
            mudarNomeBotao('Iniciar');

            mostrarCampoHora();
            //Mostra as horas gastas;
            var hora = window.document.querySelector('div#hora')
            hora.innerHTML = `<p><strong>${converterHora(tempoGasto)}</strong></p>`;
        }
    }
}

function montarTelaIniciar() {

    var nome = localStorage.getItem('nomeItem');

    //Setta o nome do h1 como o nome do item;
    window.document.querySelector('#titulo').innerHTML = nome;

    //muda o nome do botao para iniciar;
    mudarNomeBotao('Iniciar');

    esconderCampoPesquisa();
}

function montarTelaParar() {
    esconderCampoHora();
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
function esconderCampoPesquisa() {
    document.getElementById("campoTexto").style.display = "none";
}

/*
/ Mostra input da tela inicial
*/
function mostrarCampoPesquisa() {
    document.getElementById("campoTexto").style.display = "block";
}

/*
/ Esconde div de hora
*/
function esconderCampoHora() {
    document.getElementById("hora").style.display = "none";
}

/*
/ Mostra div de hora
*/
function mostrarCampoHora() {
    document.getElementById("hora").style.display = "block";
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
    return addZeroes(d.getHours()) + "" + addZeroes(d.getMinutes());
}


function soma(n1 = 0, n2 = 0) {
    return n1 + n2;
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
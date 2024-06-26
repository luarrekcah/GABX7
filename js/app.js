const IMAGENS = ["bomba.png", "diamante.png"];
const QUANT_BOMBAS = 20;
const QUANT_DIAMANTES = 4;
var estrelasSelecionadas = 3;
var diamantesGerados = 0;

function selecionarEstrela(e) {
    estrelasSelecionadas = e;
    document.querySelectorAll(".estrela").forEach((function(e) {
        e.classList.remove("selecionada");
    }));
    document.getElementById("estrela-" + e).classList.add("selecionada");
}

function sortear(e) {
    for (var a = e.reduce((function(e, a) {
            return e + a;
        }), 0), t = Math.floor(Math.random() * a), r = 0; r < e.length; r++) {
        if (t < e[r]) return r;
        t -= e[r];
    }
}

const TAMANHO_MATRIZ = 5;

function resetarQuadrados() {
    // Resetar quadrados para imagens de bomba
    var quadrados = document.querySelectorAll(".quadrado");
    quadrados.forEach(function(quadrado) {
        quadrado.innerHTML = '<img src="images/bomba.png">';
    });
}

function gerarSinal() {
    var e = document.getElementById("avisodep");
    var a = document.getElementById("botao-sinal");


    // Resetar quadrados em todos os cliques
    resetarQuadrados();

    a.innerHTML = "Hackeando mines";
    a.style.backgroundColor = "#0bad20";
    a.disabled = !0;

    function addLoadingDots() {
        var dots = '';
        var interval = setInterval(function() {
            a.innerHTML = "Hackeando mines" + dots;
            dots += '.';
            if (dots.length > 3) dots = '';
        }, 500);

        setTimeout(function() {
            clearInterval(interval);
        }, 5000);
    }

    addLoadingDots();

    setTimeout(function() {
        for (var t = document.querySelectorAll(".quadrado"), r = 0; r < t.length; r++) t[r].remove();
        var n = new Array(5);
        for (r = 0; r < 5; r++) {
            n[r] = new Array(5);
            for (var o = 0; o < 5; o++) n[r][o] = "bomba.png";
        }
        for (var d = 0; d < 4;) {
            r = Math.floor(5 * Math.random()), o = Math.floor(5 * Math.random());
            "bomba.png" == n[r][o] && (n[r][o] = "diamante.png", d++);
        }
        for (r = 0; r < 5; r++) {
            var l = document.getElementById("fileira-" + (r % 5 + 1));
            for (o = 0; o < 5; o++) {
                var s = n[r][o],
                    i = document.createElement("div");
                i.className = "quadrado";
                i.innerHTML = '<img src="images/' + s + '">';
                l.appendChild(i);
                e && "block" === getComputedStyle(e).display && e.parentNode.removeChild(e);
            }
        }
        var c = 30,
            m = setInterval((function() {
                c--, a.innerHTML = "Aguarde " + c + " segundos...";
                0 == c && (clearInterval(m), a.innerHTML = "HACKEAR SINAL!", a.style.backgroundColor = "#2f00ff", a.disabled = !1);
            }), 1e3);
    }, 5000);
}

var iframeAberto = !1,
    botaoIframe = document.getElementById("meu-iframe");

function toggleIframe() {
    var e = document.getElementById("meu-iframe"),
        a = document.getElementById("botao-iframe");
    "none" === e.style.display ? (e.style.display = "block", a.textContent = "Fechar Casa de Aposta") : (e.style.display = "none", a.textContent = "Abrir Casa de Aposta");
}
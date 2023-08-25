import { Termo } from "./termo.js";
class TelaTermo {
    constructor() {
        this.registrarElementos();
        this.registrarEventos();
    }
    registrarElementos() {
        // Casts
        this.jogoDoTermo = new Termo();
        this.pnlConteudo = document.getElementById('pnlConteudo');
        this.pnlTermo = document.getElementById('pnlTermo');
        this.pnlTeclado = document.getElementById('pnlTeclado');
        this.btnEnter = document.getElementById('btnEnter');
        this.btnApagar = document.getElementById('btnApagar');
        this.botoes = [];
        this.linha = 0;
        this.coluna = 0;
    }
    registrarEventos() {
        for (let botao of this.pnlTeclado.children) {
            if (botao.textContent != "↤" && botao.textContent != 'Enter')
                botao.addEventListener("click", (sender) => this.escreverLetra(sender));
        }
        this.btnEnter.addEventListener("click", (sender) => this.darPalpite(sender));
        this.btnApagar.addEventListener("click", () => this.apagar());
    }
    escreverLetra(sender) {
        const botaoClicado = sender.target;
        if (this.jogoDoTermo.palavra.length > 4)
            return;
        this.botoes[this.coluna] = botaoClicado;
        const palpite = botaoClicado.textContent[0];
        this.pnlTermo.children.item(this.linha).children.item(this.coluna).textContent = palpite;
        this.jogoDoTermo.palavra += palpite;
        this.coluna++;
    }
    darPalpite(sender) {
        if (this.jogoDoTermo.palavra.length < 5)
            return;
        if (this.jogoDoTermo.palavra == this.jogoDoTermo.palavraSecreta) {
            for (let i = 0; i < 5; i++) {
                const elemento = this.pnlTermo.children.item(this.linha).children.item(i);
                elemento.style.backgroundColor = 'green';
            }
            this.finalizarJogo(true);
        }
        else if (this.linha > 4) {
            this.finalizarJogo(false);
        }
        else {
            let i = 0;
            for (let b of this.botoes) {
                const elemento = this.pnlTermo.children.item(this.linha).children.item(i);
                if (this.jogoDoTermo.palavraSecreta.includes(b.innerText)) {
                    b.style.backgroundColor = 'yellow';
                    elemento.style.backgroundColor = 'yellow';
                    if (this.jogoDoTermo.palavraSecreta.charAt(i) == this.jogoDoTermo.palavra.charAt(i)) {
                        b.style.backgroundColor = 'green';
                        elemento.style.backgroundColor = 'green';
                    }
                }
                else {
                    b.style.backgroundColor = 'gray';
                    elemento.style.backgroundColor = 'gray';
                }
                i++;
            }
            this.jogoDoTermo.palavra = '';
            this.botoes = [];
            this.linha++;
            this.coluna = 0;
        }
    }
    apagar() {
        if (this.coluna == 0)
            return;
        this.jogoDoTermo.palavra = this.jogoDoTermo.palavra.substring(0, this.jogoDoTermo.palavra.length - 1);
        this.pnlTermo.children.item(this.linha).children.item(this.coluna - 1).textContent = '';
        this.coluna--;
    }
    desabilitarBotoes() {
        for (let botao of this.pnlTeclado.children) {
            const b = botao;
            b.disabled = true;
        }
    }
    finalizarJogo(resultado) {
        if (resultado) {
            this.exibirNotificacao("Parabéns, você acertou!", true);
        }
        else {
            this.exibirNotificacao("Que pena... você perdeu! A palavra era '" + this.jogoDoTermo.palavraSecreta + "'", false);
        }
        this.desabilitarBotoes();
        setTimeout(function () {
            location.reload();
        }, 5000);
    }
    exibirNotificacao(mensagem, jogadorAcertou) {
        const pnlNotificacao = document.getElementById('pnl-notificacao');
        const txtNotificacao = document.createElement('p');
        txtNotificacao.textContent = mensagem;
        this.classificarNotificacao(jogadorAcertou, txtNotificacao);
        setTimeout(function () {
            var _a;
            (_a = pnlNotificacao.querySelector('p')) === null || _a === void 0 ? void 0 : _a.remove();
        }, 5000);
        pnlNotificacao.appendChild(txtNotificacao);
    }
    classificarNotificacao(jogadorAcertou, txtNotificacao) {
        if (jogadorAcertou) {
            txtNotificacao.classList.remove('notificacao-erro');
            txtNotificacao.classList.add('notificacao-acerto');
            return;
        }
        txtNotificacao.classList.remove('notificacao-acerto');
        txtNotificacao.classList.add('notificacao-erro');
    }
}
window.addEventListener('load', () => new TelaTermo());
//# sourceMappingURL=tela-termo.js.map
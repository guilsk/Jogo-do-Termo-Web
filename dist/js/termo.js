export class Termo {
    constructor() {
        this.selecionarPalavra();
        this.palavra = '';
    }
    selecionarPalavra() {
        const palavras = [
            "ABRIR", "AMIGO", "BOLDO", "CAIXA", "CASAL",
            "CORPO", "DEDOS", "DENTE", "DIZER", "ERROS",
            "FALAR", "FESTA", "FOGAO", "GANHO", "GIRAR",
            "GRITO", "HORAS", "JOGOS", "JULHO", "LIMAO",
            "LOUCO", "MACAS", "MAIOR", "MELAO", "MOLHO"
        ];
        const n = Math.floor(Math.random() * palavras.length);
        this.palavraSecreta = palavras[n];
        console.log(this.palavraSecreta);
    }
}
//# sourceMappingURL=termo.js.map
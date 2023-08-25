import { Termo } from "./termo.js"

class TelaTermo{
  pnlConteudo: HTMLDivElement
  pnlTermo: HTMLDivElement
  pnlTeclado: HTMLDivElement
  btnEnter: HTMLButtonElement

  botoes: Array<HTMLButtonElement>

  linha: number
  coluna: number

  jogoDoTermo: Termo

  constructor(){
    this.registrarElementos()
    this.registrarEventos()
  }

  registrarElementos(): void {
    // Casts
    this.jogoDoTermo = new Termo()

    this.pnlConteudo = document.getElementById('pnlConteudo') as HTMLDivElement
    
    this.pnlTermo = document.getElementById('pnlTermo') as HTMLDivElement
    
    this.pnlTeclado = document.getElementById('pnlTeclado') as HTMLDivElement

    this.btnEnter = document.getElementById('btnEnter') as HTMLButtonElement
    
    this.botoes = []

    this.linha = 0

    this.coluna = 0
  }

  registrarEventos(): void {
    for (let botao of this.pnlTeclado.children) {
      botao.addEventListener("click", (sender) => this.escreverLetra(sender))
    }

    this.btnEnter.addEventListener("click", (sender) => this.darPalpite(sender))
  }

  escreverLetra(sender: Event): void{
    
    const botaoClicado = sender.target as HTMLButtonElement
    
    if(botaoClicado.innerText == 'Enter') return
    
    this.botoes[this.coluna] = botaoClicado
    
    this.jogoDoTermo.palavra += botaoClicado.innerText

    const palpite = botaoClicado.textContent![0]

    this.pnlTermo.children.item(this.linha)!.children.item(this.coluna)!.textContent = palpite

    this.coluna++
    
    if(this.coluna > 4) {

      this.coluna = 0

    }

  }

  darPalpite(sender: Event): void {

    if(this.pnlTermo.children.item(this.linha)!.children.item(this.coluna)!.textContent == '') return

    if(this.jogoDoTermo.palavra == this.jogoDoTermo.palavraSecreta){

      for(let i = 0; i < 5; i++){

          const elemento = this.pnlTermo.children.item(this.linha)!.children.item(i) as HTMLElement

          elemento.style.backgroundColor = 'green'

      }

      this.finalizarJogo(true)

    }else if(this.linha > 4){

      this.finalizarJogo(false)

    }else{

      let i = 0

      for(let b of this.botoes){

        if(this.jogoDoTermo.palavraSecreta.includes(b.innerText)){

          b.style.backgroundColor = 'yellow'

          const elemento = this.pnlTermo.children.item(this.linha)!.children.item(i) as HTMLElement

          elemento.style.backgroundColor = 'yellow'

          if(this.jogoDoTermo.palavraSecreta.charAt(i) == this.jogoDoTermo.palavra.charAt(i)){

            b.style.backgroundColor = 'green'

            elemento.style.backgroundColor = 'green'

          }

        }else{

          b.disabled = true

        }

        i++

      }
      
      this.jogoDoTermo.palavra = ''

      this.botoes = []
      
      this.linha++

      this.coluna = 0
    
    }

  }

  desabilitarBotoes(): void{
    for(let botao of this.pnlTeclado.children){
      const b = botao as HTMLButtonElement
      b.disabled = true
    }
  }

  finalizarJogo(resultado: boolean){
    if(resultado){
      console.log('Ganhou!!!')
    }else{
      console.log('Perdeu!!!')
    }
    this.desabilitarBotoes()
    setTimeout(function() {
      location.reload()
    }, 5000);
  }

  

}

window.addEventListener('load', () => new TelaTermo());
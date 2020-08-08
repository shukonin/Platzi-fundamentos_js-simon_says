const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const bntReiniciar = document.getElementById('btnReiniciar')
const ULTIMO_NIVEL = 10;

class Juego {
  constructor() {
    this.nivel = 1;
    this.colores = {
        celeste,
        violeta,
        naranja,
        verde,
    }
    this.toggleBtnEmpezar();
    this.generarSecuencia();
    this.agregarEventosClick();
    setTimeout(() => this.iniciarNivel(), 700);
  }

  toggleBtnEmpezar() {
    if(btnEmpezar.classList.contains('hide')) {
      btnEmpezar.classList.remove('hide');
    } else {
      btnEmpezar.classList.add('hide');
    }
  }

  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random()*4));
  }

  iniciarNivel() {
    this.subnivel = 0;
    this.iluminarSecuencia();
  }

  iluminarSecuencia() {
      for (let i = 0; i < this.nivel; i++) {
        const color = this.transformarNumeroAColor(this.secuencia[i]);
        setTimeout(() => this.iluminarColor(color), 800 * i) ;
      }
  }

  transformarNumeroAColor(num) {
    switch (num) {
        case 0:
            return 'celeste';
        case 1:
            return 'violeta';
        case 2:
            return 'naranja';
        case 3:
            return 'verde';
    }
  }

  transformarColorANumero (color) {
    switch (color){
        case 'celeste':
            return 0;
        case 'violeta':
            return 1;
        case 'naranja':
            return 2;
        case 'verde':
            return 3; 
      }
  }
  

  iluminarColor(color) {
    this.colores[color].classList.add('light');
    setTimeout(() => this.apagarColor(color), 350);
  }

  apagarColor(color) {
    this.colores[color].classList.remove('light');
  }

  agregarEventosClick () {
    this.colores.celeste.addEventListener('click', this.elegirColor.bind(this))
    this.colores.verde.addEventListener('click', this.elegirColor.bind(this))
    this.colores.violeta.addEventListener('click', this.elegirColor.bind(this))
    this.colores.naranja.addEventListener('click', this.elegirColor.bind(this))
  }

  eliminarEventosClick () {
    juego.colores.celeste.removeEventListener('click', this.elegirColor.bind(this))
    juego.colores.verde.removeEventListener('click', this.elegirColor.bind(this))
    juego.colores.violeta.removeEventListener('click', this.elegirColor.bind(this))
    juego.colores.naranja.removeEventListener('click', this.elegirColor.bind(this))
  }

  elegirColor(event) {
    console.log(event);
    const nombreColor = event.target.dataset.color;
    const numeroColor = this.transformarColorANumero(nombreColor);
    this.iluminarColor(nombreColor);
    if(numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++;
      if (this.subnivel === this.nivel) {
        this.nivel++;
        if(this.nivel === ULTIMO_NIVEL + 1) {
            this.ganoElJuego();
        } else {
            setTimeout(() => this.iniciarNivel(), 1500);
        }
      }
    } else {
      this.perdioElJuego();
    }
  }

  ganoElJuego() {
    //El swal devuelve una promesa
    swal('Platzi', 'Felicitaciones, ganaste el juego', 'success')
      .then(() => {
        this.inicializar();
      })
  }

  perdioElJuego() {
    swal('Platzi', 'Lo siento, perdiste', 'error')
      .then(() => {
        this.toggleBtnReiniciar();
      })
  }

  reiniciarJuego() {
    this.toggleBtnReiniciar();
    this.nivel = 1;
    this.generarSecuencia();
    setTimeout(() => this.iniciarNivel(), 700);
  }

  toggleBtnReiniciar() {
    if(bntReiniciar.classList.contains('hide')) {
      bntReiniciar.classList.remove('hide');
    } else {
      bntReiniciar.classList.add('hide');
    }
  }
 
}

function empezarJuego() {
  window.juego = new Juego()
}




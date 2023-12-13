import { Component, Input, EventEmitter, Output, ElementRef, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrl: './nota.component.css'
})
export class NotaComponent implements OnInit {
  editando: boolean = false;
  titulo_old = "";
  nota_old = "";
  color_old = "";


  @Input() titulo: string = "";
  @Input() nota: string = "";
  @Input() index: number = 0;
  @Input() color: string = "";

  @Output() borrado = new EventEmitter();
  @Output() editado = new EventEmitter();
  @Output() subido = new EventEmitter();
  @Output() bajado = new EventEmitter();

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.actualizarColores();
    console.log(this.color);

  }

  actualizarColores(color?: string) {
    if (color) {
      console.log("Color insertado");

      this.color = color;
    }
    let background: string = this.color//.length > 0 ? this.color : "#fbfbfb";
    let hover: string = this.modificarColor(background, 10);
    let boton_hover: string = this.modificarColor(background, 30)
    this.el.nativeElement.style.setProperty('--color-fondo', background);
    this.el.nativeElement.style.setProperty('--color-hover', hover);
    this.el.nativeElement.style.setProperty('--color-boton-hover', boton_hover);
    //this.color = background// != "#fbfbfb" ? background : this.color;
  }

  borrar() {
    this.borrado.emit(this.index);
  }

  cancelar() {
    this.editando = false;
    this.titulo = this.titulo_old;
    this.nota = this.nota_old;
    this.color = this.color_old;
    this.actualizarColores();
  }

  editar() {
    if (this.editando) {
      console.log("this.color " + this.color);
      // this.actualizarColores(this.color);
      // this.color = this.color_old;
      this.editado.emit({ "titulo": this.titulo, "nota": this.nota, "index": this.index, "color": this.color })
    } else {
      this.titulo_old = this.titulo;
      this.nota_old = this.nota;
      this.color_old = this.color;
    }
    this.editando = !this.editando
  }

  subir() {
    this.subido.emit(this.index);
    console.log(this.color);

  }

  bajar() {
    this.bajado.emit(this.index)
  }

  shiftenter(event: KeyboardEvent) {
    if (event.key === 'Enter' && event.shiftKey) {
      // Se presionó Shift+Enter, ejecuta tu lógica aquí
      console.log('Shift+Enter presionado');
      this.editar();
      event.preventDefault();
      // Puedes llamar a una función o realizar la acción que desees
    }
  }

  private modificarColor(codigo: string, potencia: number): string {
    const isColor = (codigo: string) => {
      const s = new Option().style;
      s.color = codigo;
      return s.color !== '';
    }
    let res: string = "#";
    const regex = /^#[0-9A-Fa-f]{6}$/;
    if (regex.test(codigo)) {
      let primero: number = parseInt(codigo.substring(1, 3), 16);
      let segundo: number = parseInt(codigo.substring(3, 5), 16);
      let tercero: number = parseInt(codigo.substring(5, 7), 16);
      let codigoArray: number[] = [primero, segundo, tercero];
      for (let i = 0; i < codigoArray.length; i++) {
        if (codigoArray[i] > potencia / 2) {
          codigoArray[i] = Math.max(0, codigoArray[i] - potencia);
        } else {
          codigoArray[i] = codigoArray[i] + potencia * 2;
        }
        let hex: string = codigoArray[i].toString(16);
        res += hex.length == 1 ? "0" + hex : hex;
      }
      return res;
    } else if (isColor(codigo)) {
      return codigo;
    } else {
      return "#000000"
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, Input, EventEmitter, Output, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

export interface apis {
  "ratio": string,
  "AA": string,
  "AALarge": string,
  "AAA": string,
  "AAALarge": string
}

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
  apiURL = "https://webaim.org/resources/contrastchecker/?fcolor=";


  @Input() titulo: string = "";
  @Input() nota: string = "";
  @Input() index: number = 0;
  @Input() color: string = "";

  @Output() borrado = new EventEmitter();
  @Output() editado = new EventEmitter();
  @Output() subido = new EventEmitter();
  @Output() bajado = new EventEmitter();

  constructor(private el: ElementRef, private renderer: Renderer2, private http: HttpClient) { }

  ngOnInit(): void {
    this.actualizarColores();
  }

  actualizarColores(color?: string) {
    if (color) {
      this.color = color;
    }
    let background: string = this.color//.length > 0 ? this.color : "#fbfbfb";
    let hover: string = this.modificarColor(background, 10);
    let boton_hover: string = this.modificarColor(background, 30)
    this.el.nativeElement.style.setProperty('--color-fondo', background);
    this.el.nativeElement.style.setProperty('--color-hover', hover);
    this.el.nativeElement.style.setProperty('--color-boton-hover', boton_hover);
    this.colorTexto(this.modificarColor(background, 0));
    // this.colorTexto(this.modificarColor(background, 0)).subscribe(
    // (res: any) => this.el.nativeElement.style.setProperty('--color-texto', res))
    // this.el.nativeElement.style.setProperty('--color-texto', this.colorTexto(this.modificarColor(background, 0)));
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
      return "#000000";
    }
  }

  private obtener_contrastes(url1: string, url2: string): Observable<apis>[] {
    return [this.http.get<apis>(url1), this.http.get<apis>(url2)];
  }

  private colorTexto(codigo: string): any {
    let codigoHex: string = codigo.substring(1, 7);
    let r: number = parseInt(codigo.substring(1, 3), 16);
    let g: number = parseInt(codigo.substring(3, 5), 16);
    let b: number = parseInt(codigo.substring(5, 7), 16);

    let luminicencia: number = 0.2126 * r / 255 + 0.7152 * g / 255 + 0.0722 * b / 255;
    const contr_blanco = 1.05 / (luminicencia + 0.05);
    const contr_negro = (luminicencia + 0.05) / 0.05;
    // let res = contr_blanco > contr_negro ? "#ffffff" : "#000000";

    const url_negro = `${this.apiURL}000000&bcolor=${codigoHex}&api`;
    const url_blanco = `${this.apiURL}FFFFFF&bcolor=${codigoHex}&api`;
    let valor_blanco: number;
    let valor_negro: number;
    forkJoin(this.obtener_contrastes(url_blanco, url_negro)).subscribe(response => {
      let blanco: apis = response[0];
      valor_blanco = parseFloat(blanco.ratio);
      let negro: apis = response[1];
      valor_negro = parseFloat(negro.ratio);
      console.log(`Blanco: ${valor_blanco}. Negro: ${valor_negro}`);

      let res = valor_blanco > valor_negro ? "#ffffff" : "#000000";
      console.log(res);

      this.el.nativeElement.style.setProperty('--color-texto', res)
      return res;
    }, error => {
      return "";
    })
    // let valor_blanco = this.http.get(url_blanco).ratio;
    // let valor_negro = this.http.get(url_negro).ratio;

  }
}

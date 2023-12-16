import { Component, Input } from '@angular/core';

export interface Nota {
  titulo: string;
  nota: string;
  index: number;
  color: string;
}

@Component({
  selector: 'app-carpeta',
  templateUrl: './carpeta.component.html',
  styleUrl: './carpeta.component.css'
})
export class CarpetaComponent {
  creando: boolean = false;
  notas: Nota[];
  reinicio: boolean = false;
  sidebarOpen: boolean = false;

  @Input() nombre: string = "a";
  @Input() id: number = 0;
  @Input() color_pred: string = "#f075C3";

  constructor() {
    let descarga = sessionStorage.getItem(this.nombre);
    this.notas = descarga ? JSON.parse(descarga) : [];
    for (let i = 0; i < this.notas.length; i++) {
    }
  }

  ngOnInit() {
    let descarga = sessionStorage.getItem(this.nombre);
    this.notas = descarga ? JSON.parse(descarga) : [];
  }

  clear(confirmado: boolean) {
    if (confirmado == true) {
      sessionStorage.clear();
      this.notas.length = 0;
      this.reinicio = false;
    } else {
      this.reinicio = !this.reinicio;
    }
  }

  crear() {
    this.creando = true;
  }

  creado([titulo, nota, color]: [string, string, string]) {
    let index = this.notas.length;
    if (this.notas != null) {
      this.notas.push({ "titulo": titulo, "nota": nota, "index": index, "color": color });
    } else {
      this.notas = [{ "titulo": titulo, "nota": nota, "index": index, "color": color }];
    }
    sessionStorage.setItem(this.nombre, JSON.stringify(this.notas));
    this.creando = false;
  }

  cancelado() {
    this.creando = false;
  }

  borrar(index: number) {
    this.notas.splice(index, 1);
    for (let i = index; i < this.notas.length; i++) {
      this.notas[i].index -= 1;
    }
    sessionStorage.setItem(this.nombre, JSON.stringify(this.notas));
    console.log("El elemento de índice " + index + " ha sido eliminado con éxito.");
  }

  editar({ "titulo": titulo, "nota": nota, "index": index, "color": color }: Nota) {
    if (this.notas[index].titulo != titulo || this.notas[index].nota != nota || this.notas[index].color != color) {
      this.notas[index] = { "titulo": titulo, "nota": nota, "index": index, "color": color };
      sessionStorage.setItem(this.nombre, JSON.stringify(this.notas));
      console.log("El elemento de índice " + index + " ha sido editado con éxito.");
    } else {
      console.log("No había nada que editar");
    }
  }

  subir(index: number) {
    if (index != 0) {
      // let titulo = this.notas[index][0];
      // this.notas[index][0] = this.notas[index-1][0];
      // this.notas[index-1][0] = titulo;
      // let nota = this.notas[index][0];
      // this.notas[index][1] = this.notas[index-1][1];
      // this.notas[index-1][1] = nota;

      let nota = this.notas[index];
      this.notas[index] = this.notas[index - 1];
      this.notas[index - 1] = nota;

      this.notas[index].index += 1;
      this.notas[index - 1].index -= 1;
      sessionStorage.setItem(this.nombre, JSON.stringify(this.notas));
    }
  }

  bajar(index: number) {
    if (index != this.notas.length - 1) {
      // let titulo = this.notas[index][0];
      // this.notas[index][0] = this.notas[index+1][0];
      // this.notas[index+1][0] = titulo;
      // let nota = this.notas[index][0];
      // this.notas[index][1] = this.notas[index+1][1];
      // this.notas[index+1][1] = nota;

      let nota = this.notas[index];
      this.notas[index] = this.notas[index + 1];
      this.notas[index + 1] = nota;

      this.notas[index].index -= 1;
      this.notas[index + 1].index += 1;

      sessionStorage.setItem(this.nombre, JSON.stringify(this.notas));
    }
  }
}

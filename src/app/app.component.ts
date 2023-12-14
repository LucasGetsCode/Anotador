import { Component } from '@angular/core';

export interface Nota {
  titulo: string;
  nota: string;
  index: number;
  color: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {

  title: string = 'Anotador';
  creando: boolean = false;
  notas: Nota[];
  carpetas: string[];
  carpeta_actual: number = 0;
  reinicio: boolean = false;
  sidebarOpen: boolean = false;

  constructor() {
    let carpetas = sessionStorage.getItem("carpetas");
    if (carpetas) {
        this.carpetas = JSON.parse(carpetas);
    } else {
      this.carpetas = ["notas"];
    }
    for (let i = 0; i < this.carpetas.length; i++) {
            
    }
    let descarga = sessionStorage.getItem("notas");
    this.notas = descarga ? JSON.parse(descarga) : [];
    for (let i = 0; i < this.notas.length; i++) {
      console.log(this.notas[i]);
    }
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

  crear(mensaje: string) {
    this.creando = true;
    console.log(mensaje);
  }

  creado([titulo, nota, color]: [string, string, string]) {
    let index = this.notas.length;
    console.log("Título: " + titulo);
    console.log("Nota: " + nota);
    if (this.notas != null) {
      this.notas.push({ "titulo": titulo, "nota": nota, "index": index, "color": color });
    } else {
      this.notas = [{ "titulo": titulo, "nota": nota, "index": index, "color": color }];
    }
    sessionStorage.setItem("notas", JSON.stringify(this.notas));
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
    sessionStorage.setItem("notas", JSON.stringify(this.notas));
    console.log("El elemento de índice " + index + " ha sido eliminado con éxito.");
  }

  editar({ "titulo": titulo, "nota": nota, "index": index, "color": color }: Nota) {
    if (this.notas[index].titulo != titulo || this.notas[index].nota != nota || this.notas[index].color != color) {
      console.log("Color " + color);
      console.log("Notas.color " + this.notas[index].color);

      this.notas[index] = { "titulo": titulo, "nota": nota, "index": index, "color": color };
      sessionStorage.setItem("notas", JSON.stringify(this.notas));
      console.log("El elemento de índice " + index + " ha sido editado con éxito.");
      console.log("Nuevo color " + this.notas[index].color);

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
      sessionStorage.setItem("notas", JSON.stringify(this.notas));
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

      sessionStorage.setItem("notas", JSON.stringify(this.notas));
    }
  }

  toggle(estado: boolean) {
    this.sidebarOpen = estado;
  }
}
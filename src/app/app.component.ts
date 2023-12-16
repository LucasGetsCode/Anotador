import { Component } from '@angular/core';

export interface Nota {
  titulo: string;
  nota: string;
  index: number;
  color: string;
}

export interface Carpeta {
  nombre: string;
  id: number;
  color_pred: string;
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
  carpetas: Carpeta[];
  carpeta_actual: number = 0;
  reinicio: boolean = false;
  sidebarOpen: boolean = false;

  constructor() {
    let carpetas = sessionStorage.getItem("carpetas");
    if (carpetas) {
      this.carpetas = JSON.parse(carpetas);
    } else {
      this.carpetas = [{ "nombre": "notas", "id": Date.now(), color_pred: "#F075C3" }];
      sessionStorage.setItem("carpetas", JSON.stringify(this.carpetas));
    }
    // for (let i = 0; i < this.carpetas.length; i++) {

    // }
    let descarga = sessionStorage.getItem("notas");
    this.notas = descarga ? JSON.parse(descarga) : [];
    for (let i = 0; i < this.notas.length; i++) {
      console.log(this.notas[i]);
    }
  }

  crear_carpeta(data?: [string, string]) {
    let nombre: string = Date.now().toString();
    let color_pred: string = "#f075C3";
    if (data) {
      nombre = data[0];
      color_pred = data[1];
    }
    this.carpetas.push({ "id": Date.now(), "nombre": nombre, "color_pred": color_pred });
    sessionStorage.setItem("carpetas", JSON.stringify(this.carpetas));
    this.cambiar_carpeta(undefined, this.carpetas.length - 1);
  }

  eliminar_carpeta() {
    this.carpetas.splice(this.carpeta_actual, 1);
    sessionStorage.setItem("carpetas", JSON.stringify(this.carpetas));
    if (this.carpeta_actual == this.carpetas.length) {
      this.carpeta_actual -= 1;
    }
    if (this.carpetas.length == 0) {
      this.carpeta_actual = 0;
      this.carpetas = [{ "nombre": "notas", "id": Date.now(), color_pred: "#F075C3" }];
      sessionStorage.setItem("carpetas", JSON.stringify(this.carpetas));
    }
  }

  cambiar_carpeta(carpeta_id?: number, indice?: number) {
    if (carpeta_id) {
      let index: number = 0;
      // let index: number = this.carpetas.indexOf(carpeta_id);
      for (let i = 0; i < this.carpetas.length; i++) {
        if (this.carpetas[i].id == carpeta_id) {
          index = i;
        }
      }
      this.carpeta_actual = index;
    } else if (indice) {
      this.carpeta_actual = indice;
    } else {
      if (this.carpeta_actual != this.carpetas.length - 1) {
        this.carpeta_actual += 1;
      } else {
        this.carpeta_actual = 0;
      }
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
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Anotador2';
  creando = false;
  notas: [[string, string, number]];

  constructor() {
    let descarga = sessionStorage.getItem("notas");
    this.notas = descarga ? JSON.parse(descarga) : [];
    for (let i = 0; i < this.notas.length; i++) {
      console.log(this.notas[i]);
    }
  }

  clear() {
    sessionStorage.clear();
  }

  crear(mensaje: string) {
    this.creando = true;
    console.log(mensaje);
  }

  creado([titulo, nota]: [string, string]) {
    let index = this.notas.length;
    console.log("Título: " + titulo);
    console.log("Nota: " + nota);
    if (this.notas != null) {
      this.notas.push([titulo, nota, index]);
    } else {
      this.notas = [[titulo, nota, index]];
    }
    sessionStorage.setItem("notas", JSON.stringify(this.notas));
    this.creando = false;   
  }

  cancelado() {
    this.creando = false;
  }

  borrar(index: number) {
    this.notas.splice(index,index);
    for (let i = index; i < this.notas.length; i++) {
      this.notas[i][2] -= 1;      
    }
    sessionStorage.setItem("notas", JSON.stringify(this.notas));
    console.log("El elemento de índice " + index + " ha sido eliminado con éxito.");
  }

  editar([titulo, nota, index] : [string, string, number]) {
    if (this.notas[index][0] != titulo || this.notas[index][1] != nota) {
      this.notas[index] = [titulo, nota, index];
      sessionStorage.setItem("notas", JSON.stringify(this.notas));
      console.log("El elemento de índice " + index + " ha sido editado con éxito.");  
    } else {
      console.log("No había nada que editar");      
    }
  }
}

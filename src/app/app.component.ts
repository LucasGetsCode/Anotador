import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'Anotador2';
  creando: boolean = false;
  notas: [string, string, number][];
  reinicio: boolean = false;

  constructor() {
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
    this.notas.splice(index,1);
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

  subir(index: number) {
    if (index != 0) {
      // let titulo = this.notas[index][0];
      // this.notas[index][0] = this.notas[index-1][0];
      // this.notas[index-1][0] = titulo;
      // let nota = this.notas[index][0];
      // this.notas[index][1] = this.notas[index-1][1];
      // this.notas[index-1][1] = nota;

      let nota = this.notas[index];
      this.notas[index] = this.notas[index-1];
      this.notas[index-1] = nota;

      this.notas[index][2] += 1;
      this.notas[index-1][2] -=1;      
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
      this.notas[index] = this.notas[index+1];
      this.notas[index+1] = nota;

      this.notas[index][2] -= 1;
      this.notas[index+1][2] +=1;

      sessionStorage.setItem("notas", JSON.stringify(this.notas));
    }
  }
}

import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrl: './nota.component.css'
})
export class NotaComponent {
  editando: boolean = false;
  titulo_old = "";
  nota_old = "";

  @Input() titulo: string = "";
  @Input() nota: string = "";
  @Input() index: number = 0;
  @Output() indexChange = new EventEmitter();

  @Output() borrado = new EventEmitter();
  @Output() editado = new EventEmitter();
  @Output() subido = new EventEmitter();
  @Output() bajado = new EventEmitter();

  borrar() {
    this.borrado.emit(this.index);
  }

  cancelar() {
    this.editando = false;
    this.titulo = this.titulo_old;
    this.nota = this.nota_old;
  }

  editar() {
    if (this.editando) {
      this.editado.emit([this.titulo, this.nota, this.index])
    } else {
      this.titulo_old = this.titulo;
      this.nota_old = this.nota;
    }
    this.editando = !this.editando
  }

  subir() {
    this.subido.emit(this.index);
    if (this.index != 0) {
      this.index -= 1;
    }
    this.indexChange.emit(this.index)
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
}

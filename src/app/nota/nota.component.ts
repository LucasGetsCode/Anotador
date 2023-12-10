import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrl: './nota.component.css'
})
export class NotaComponent {
  editando: boolean = false;

  @Input() titulo: string = "";
  @Input() nota: string = "";
  @Input() index: number = 0;

  @Output() borrado = new EventEmitter();
  @Output() editado = new EventEmitter();

  borrar() {
    this.borrado.emit(this.index);
  }

  editar() {
    if (this.editando) {
      this.editado.emit([this.titulo, this.nota, this.index])
    }
    this.editando = !this.editando
  }
}

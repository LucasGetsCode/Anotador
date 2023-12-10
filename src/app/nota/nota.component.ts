import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrl: './nota.component.css'
})
export class NotaComponent {
  @Input() titulo: string = "";
  @Input() nota: string = "";
  @Input() index: number = 0;

  @Output() borrado = new EventEmitter();

  borrar() {
    this.borrado.emit(this.index);
  }

  editar() {

  }
}

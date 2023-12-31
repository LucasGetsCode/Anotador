import { Component, Output, EventEmitter, NgModule, Input } from '@angular/core';

@Component({
  selector: 'app-nota-creador',
  templateUrl: './nota-creador.component.html',
  styleUrl: './nota-creador.component.css'
})
export class NotaCreadorComponent {
  titulo = "";
  nota = "";

  @Input() color: string = "";

  @Output() enviarDatos = new EventEmitter();
  @Output() cancelarEnvio = new EventEmitter();

  ok() {
    this.enviarDatos.emit([this.titulo, this.nota, this.color])
  }

  shiftenter(event: KeyboardEvent) {
    if (event.key === 'Enter' && event.shiftKey) {
      this.ok();
      event.preventDefault();
    }
  }

  cancelar() {
    this.cancelarEnvio.emit();
  }
}

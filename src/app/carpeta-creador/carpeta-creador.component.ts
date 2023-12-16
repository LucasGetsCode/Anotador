import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-carpeta-creador',
  templateUrl: './carpeta-creador.component.html',
  styleUrl: './carpeta-creador.component.css'
})
export class CarpetaCreadorComponent {
  nombre: string = "";
  color_pred: string = "#F075C3";

  @Output() enviarDatos = new EventEmitter();
  @Output() cancelarEnvio = new EventEmitter();

  ok() {
    this.enviarDatos.emit([this.nombre, this.color_pred])
  }

  shiftenter(event: KeyboardEvent) {
    if (event.key === 'Enter' && event.shiftKey) {
      this.ok();
      event.preventDefault();
    }
  }

  cancelar() {
    console.log("cancelar");
    this.cancelarEnvio.emit();
  }
}

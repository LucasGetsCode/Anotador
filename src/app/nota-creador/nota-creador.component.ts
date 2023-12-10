import { Component, Output, EventEmitter, NgModule } from '@angular/core';

@Component({
  selector: 'app-nota-creador',
  templateUrl: './nota-creador.component.html',
  styleUrl: './nota-creador.component.css'
})
export class NotaCreadorComponent {
  titulo = ""
  nota = ""

  @Output() enviarDatos = new EventEmitter();
  @Output() cancelarEnvio = new EventEmitter();

    ok() {
      this.enviarDatos.emit([this.titulo, this.nota])
    }

    cancelar() {
      console.log("cancelar");
      this.cancelarEnvio.emit();
    }
}

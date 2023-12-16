import { Component, EventEmitter, Output, Input } from '@angular/core';

export interface Carpeta {
  nombre: string;
  id: number;
  color_pred: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  sidebarOpen: boolean = false;
  creando: boolean = false;

  @Input() carpetas: Carpeta[] = [];

  @Output() toggle = new EventEmitter();
  @Output() carpeta_select = new EventEmitter();
  @Output() carpeta_create = new EventEmitter();

  cambio_carpeta(carpeta: Carpeta) {
    this.carpeta_select.emit(carpeta.id);
  }

  cancelar_carpeta() {
    this.creando = false;
  }

  creando_carpeta() {
    this.creando = true;
  }

  crear_carpeta([nombre, color_pred]: [string, string]) {
    this.carpeta_create.emit([nombre, color_pred]);
    this.creando = false;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.toggle.emit(this.sidebarOpen);
  }
}

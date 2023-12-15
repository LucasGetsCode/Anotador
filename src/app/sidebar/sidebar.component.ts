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
  sidebarOpen = false;

  @Input() carpetas: Carpeta[] = [];

  @Output() toggle = new EventEmitter();
  @Output() carpeta_select = new EventEmitter();

  cambio_carpeta(carpeta: Carpeta) {
    this.carpeta_select.emit(carpeta);
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.toggle.emit(this.sidebarOpen);
  }
}

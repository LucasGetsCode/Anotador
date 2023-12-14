import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  sidebarOpen = false;
  
  @Input() carpetas: string[] = [];

  @Output() toggle = new EventEmitter();
  @Output() carpeta_select = new EventEmitter();

  cambio_carpeta(carpeta: string) {
    this.carpeta_select.emit(carpeta);
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.toggle.emit(this.sidebarOpen);
  }
}

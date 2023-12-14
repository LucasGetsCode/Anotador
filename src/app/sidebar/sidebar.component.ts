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

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.toggle.emit(this.sidebarOpen);
  }
}

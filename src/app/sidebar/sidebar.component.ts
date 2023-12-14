import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  sidebarOpen = false;

  @Output() toggle = new EventEmitter();

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.toggle.emit(this.sidebarOpen);
  }
}

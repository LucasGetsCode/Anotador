import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotaComponent } from './nota/nota.component';
import { NotaCreadorComponent } from './nota-creador/nota-creador.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CarpetaComponent } from './carpeta/carpeta.component';
import { CarpetaCreadorComponent } from './carpeta-creador/carpeta-creador.component';

@NgModule({
  declarations: [
    AppComponent,
    NotaComponent,
    NotaCreadorComponent,
    SidebarComponent,
    CarpetaComponent,
    CarpetaCreadorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

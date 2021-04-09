import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThreeRendererModule } from './features/three-renderer/three-renderer.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ThreeRendererModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

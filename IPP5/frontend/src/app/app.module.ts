import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactcrudComponent } from './contactcrud/contactcrud.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from'@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ContactcrudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

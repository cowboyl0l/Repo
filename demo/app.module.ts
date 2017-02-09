import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { TreeModule } from '../index';
import { ObjectItemComponent } from './objects/object-item.component';
import { ObjectItemModule } from './objects/object-item.module';
import { HttpModule }   from '@angular/http';

@NgModule({
  declarations: [AppComponent],
  imports:      [BrowserModule, TreeModule, HttpModule, ObjectItemModule],
  bootstrap:    [AppComponent, ObjectItemComponent]
})
export class AppModule {
}

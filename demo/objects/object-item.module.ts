import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ObjectItemComponent} from './object-item.component';
import { HttpModule }   from '@angular/http';
import  { Objtest } from  './test/obj-test';

@NgModule({
  imports: [CommonModule, HttpModule],
  declarations: [ObjectItemComponent, Objtest],
  exports: [ObjectItemComponent, Objtest],
  providers: [],
  bootstrap: [Objtest]
})
export class ObjectItemModule {
}

import { Component, Input} from '@angular/core';
import  {ObjectItem} from '../object-item.component';
@Component({
  selector: 'obj-test',
  template: `<li>{{ objectItems.rid }}</li>`
})

export class Objtest {

  @Input() public objectItems: ObjectItem;

}

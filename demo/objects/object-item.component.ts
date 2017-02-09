import { HttpService } from '../../demo/http.service'
import { Response} from '@angular/http';
import { Component, Output} from '@angular/core';

@Component({
    selector: 'objects',
    providers: [HttpService],
    template: `<ul>
             <obj-test *ngFor="let obj of objectItems | async" [objectItems]="obj"></obj-test>
          </ul>`
})

export class ObjectItemComponent {


    @Output() public objectItems: Array<ObjectItem> = [new ObjectItem(), new ObjectItem(),new ObjectItem()];

    public constructor(private httpService: HttpService){
    }

    public getObjectData(className:string)
    {
      console.debug("start");
      this.httpService.getObjects(className).subscribe((data: Response) =>  this.objectItems = (data).json());
      console.debug(this.objectItems);
      console.debug("end");
    }

}

export class ObjectItem {
  public constructor()
  {
    this.Name = "Name";
    this.rid = "Rid";
  }

   public Name: string;
   public rid: string;
}


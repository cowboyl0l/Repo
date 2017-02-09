import { Component } from '@angular/core';
import { NodeEvent, TreeModel, RenamableNode } from '../index';
import { HttpService} from './http.service';
import { HttpModule }   from '@angular/http';
import { Response} from '@angular/http';
import { ObjectItemComponent } from './objects/object-item.component';
declare const alertify: any;

@Component({
  selector: 'app',
  providers: [HttpService, ObjectItemComponent],
  template: `
    <div class="tree-demo-app">
      <div class="tree-container">
        <p>Fonts tree</p>
        <tree
          [tree]="fonts" 
          (nodeRemoved)="onNodeRemoved($event)"
          (nodeRenamed)="onNodeRenamed($event)"
          (nodeSelected)="onNodeSelected($event)"
          (nodeMoved)="onNodeMoved($event)"
          (nodeCreated)="onNodeCreated($event)"
          (showObjects)="showObjects($event)"          >
        </tree>
      </div>
      <div class="tree-container">
      </div>
    </div>
    `,
  styles: [`
   .tree-demo-app {
      margin: auto;
      width: -moz-fit-content;
      width: -webkit-fit-content;
      width: fit-content;
    }
    .tree-demo-app .tree-container {
      float: left;
      vertical-align: top;
      width: 500px;
    }
    .tree-demo-app .tree-container p {
      color: #40a070;
      font-size: 2em;
    } 
  `]
})
export class AppComponent {
  public fonts: TreeModel = {
    value: 'notLoaded'
  };

  constructor(private httpService: HttpService, private objectItemcomponent: ObjectItemComponent){
  }

  ngOnInit(){
        this.httpService.getData().subscribe((data: Response) => this.fonts=data.json());
    }

  public onNodeRemoved(e: NodeEvent): void {
    
    if(e.parent.value.toString() == "Свойства")
    {
      this.httpService.deleteProperty(e.parent.parentNode.value.toString(),e.node.value.toString());
    }
    else
    {
      this.httpService.deleteClass(e.node.value.toString());
    }
   
    this.logEvent(e, 'Удалено');
  }

  public onNodeMoved(e: NodeEvent): void {
    this.logEvent(e, 'Перемещено');
  }

  public onNodeRenamed(e: NodeEvent): void {
      if(e.parent.value.toString() == "Свойства")
      {
        this.httpService.renameProperty(e.newValue,e.oldValue,e.parent.parentNode.value.toString());
      }
    this.logEvent(e, 'Переименовано');
  }

  public onNodeCreated(e: NodeEvent): void {

    if(e.parent.value.toString() == "Свойства")
    {
      this.httpService.addProperty(e.node.value.toString(),e.parent.parentNode.value.toString());
    }
    else
    {
      this.httpService.addClass(e.node.value.toString(), e.parent.value.toString());
    }
    this.logEvent(e, 'Создано');
  }

  public onNodeSelected(e: NodeEvent): void {
    this.logEvent(e, 'Выбрано');
  }

  public showObjects(e: NodeEvent): void{
    this.objectItemcomponent.getObjectData(e.node.value.toString());
    this.logEvent(e, "Объекты");
  }

  public logEvent(e: NodeEvent, message: string): void {
    console.log(e);
    alertify.message(`${message}: ${e.node.value}`);
  }
}

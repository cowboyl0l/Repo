import { Component, EventEmitter, Output, Renderer, Inject, OnDestroy, OnInit } from '@angular/core';
import { NodeMenuService } from './node-menu.service';
import { NodeMenuItemSelectedEvent, NodeMenuItemAction, NodeMenuEvent, NodeMenuAction } from './menu.types';
import { isLeftButtonClicked, isEscapePressed } from '../common/utils/event.utils';
import { styles } from './node-menu.styles';

// custom
import { TreeInternalComponent } from '../tree.component';


@Component({
  selector: 'node-menu',
  styles: styles,
  template: `
    <div class="node-menu">
      <ul class="node-menu-content">
        <li class="node-menu-item" *ngFor="let menuItem of availableMenuItems"
            (click)="onMenuItemSelected($event, menuItem)">
          <div class="node-menu-item-icon {{menuItem.cssClass}}"></div>
          <span class="node-menu-item-value">{{menuItem.name}}</span>
        </li>
      </ul>
    </div>
  `
})
export class NodeMenuComponent implements OnInit, OnDestroy {
  @Output()
  public menuItemSelected: EventEmitter<NodeMenuItemSelectedEvent> = new EventEmitter<NodeMenuItemSelectedEvent>();


 public addClassMenuItem = {name: 'Новый класс', action: NodeMenuItemAction.NewFolder, cssClass: 'new-folder'};
 public viewObjectMenuItem = {name: 'Объекты', action: NodeMenuItemAction.ShowObjects, cssClass: 'ShowObjects'};
 public deleteMenuItem = {name: 'Удалить', action: NodeMenuItemAction.Remove, cssClass: 'remove' };                     
 public renameMenuItem = {name: 'Переименовать', action: NodeMenuItemAction.Rename, cssClass: 'rename' };
 public newPropertyMenuItem = {name: 'Новое свойство', action: NodeMenuItemAction.NewTag, cssClass: 'new-tag' };                 




  public availableMenuItems: NodeMenuItem[] =[];

  private disposersForGlobalListeners: Function[] = [];

  public constructor(@Inject(Renderer) private renderer: Renderer,
                     @Inject(NodeMenuService) private nodeMenuService: NodeMenuService,
                     @Inject(TreeInternalComponent) private treeInternalComponent: TreeInternalComponent) {

                       // custom
                          if(this.treeInternalComponent.tree.children != null &&
                           !this.treeInternalComponent.isPropertyFolder())
                          {
                            this.availableMenuItems.push(this.addClassMenuItem); 
                           // this.availableMenuItems.push(this.newPropertyMenuItem);
                            this.availableMenuItems.push(this.deleteMenuItem);
                            //this.availableMenuItems.push(this.renameMenuItem);  
                            this.availableMenuItems.push(this.viewObjectMenuItem);    
                          }
                          else if(this.treeInternalComponent.tree.children == null)
                          {
                            this.availableMenuItems.push(this.renameMenuItem);
                            this.availableMenuItems.push(this.deleteMenuItem);    
                          }
                          else if(this.treeInternalComponent.isPropertyFolder())
                          {
                            this.availableMenuItems.push(this.newPropertyMenuItem);
                          }               
  }

  public ngOnInit(): void {
    this.disposersForGlobalListeners.push(this.renderer.listenGlobal('document', 'keyup', this.closeMenu.bind(this)));
    this.disposersForGlobalListeners.push(this.renderer.listenGlobal('document', 'click', this.closeMenu.bind(this)));
  }

  public ngOnDestroy(): void {
    this.disposersForGlobalListeners.forEach((dispose: Function) => dispose());
  }

  private onMenuItemSelected(e: MouseEvent, selectedMenuItem: NodeMenuItem): void {
    if (isLeftButtonClicked(e)) {
      this.menuItemSelected.emit({nodeMenuItemAction: selectedMenuItem.action});
    }
  }

  private closeMenu(e: MouseEvent | KeyboardEvent): void {
    const mouseClicked = e instanceof MouseEvent;
    const escapePressed = e instanceof KeyboardEvent && isEscapePressed(e);

    if (escapePressed || mouseClicked) {
      const nodeMenuEvent: NodeMenuEvent = {
        sender: (e.target as HTMLElement),
        action: NodeMenuAction.Close
      };

      this.nodeMenuService.nodeMenuEvents$.next(nodeMenuEvent);
    }
  }
}

export interface NodeMenuItem {
  name: string;
  action: NodeMenuItemAction;
  cssClass: string;
}

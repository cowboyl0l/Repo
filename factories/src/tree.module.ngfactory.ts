/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
 /* tslint:disable */

import * as import0 from '@angular/core/src/linker/ng_module_factory';
import * as import1 from '../../src/tree.module';
import * as import2 from '@angular/common/src/common_module';
import * as import3 from '@angular/common/src/localization';
import * as import4 from '../../src/draggable/node-draggable.service';
import * as import5 from '../../src/menu/node-menu.service';
import * as import6 from '../../src/tree.service';
import * as import7 from '@angular/core/src/di/injector';
import * as import8 from '@angular/core/src/i18n/tokens';
class TreeModuleInjector extends import0.NgModuleInjector<import1.TreeModule> {
  _CommonModule_0:import2.CommonModule;
  _TreeModule_1:import1.TreeModule;
  __NgLocalization_2:import3.NgLocaleLocalization;
  __NodeDraggableService_3:import4.NodeDraggableService;
  __NodeMenuService_4:import5.NodeMenuService;
  __TreeService_5:import6.TreeService;
  constructor(parent:import7.Injector) {
    super(parent,([] as any[]),([] as any[]));
  }
  get _NgLocalization_2():import3.NgLocaleLocalization {
    if ((this.__NgLocalization_2 == (null as any))) { (this.__NgLocalization_2 = new import3.NgLocaleLocalization(this.parent.get(import8.LOCALE_ID))); }
    return this.__NgLocalization_2;
  }
  get _NodeDraggableService_3():import4.NodeDraggableService {
    if ((this.__NodeDraggableService_3 == (null as any))) { (this.__NodeDraggableService_3 = new import4.NodeDraggableService()); }
    return this.__NodeDraggableService_3;
  }
  get _NodeMenuService_4():import5.NodeMenuService {
    if ((this.__NodeMenuService_4 == (null as any))) { (this.__NodeMenuService_4 = new import5.NodeMenuService()); }
    return this.__NodeMenuService_4;
  }
  get _TreeService_5():import6.TreeService {
    if ((this.__TreeService_5 == (null as any))) { (this.__TreeService_5 = new import6.TreeService()); }
    return this.__TreeService_5;
  }
  createInternal():import1.TreeModule {
    this._CommonModule_0 = new import2.CommonModule();
    this._TreeModule_1 = new import1.TreeModule();
    return this._TreeModule_1;
  }
  getInternal(token:any,notFoundResult:any):any {
    if ((token === import2.CommonModule)) { return this._CommonModule_0; }
    if ((token === import1.TreeModule)) { return this._TreeModule_1; }
    if ((token === import3.NgLocalization)) { return this._NgLocalization_2; }
    if ((token === import4.NodeDraggableService)) { return this._NodeDraggableService_3; }
    if ((token === import5.NodeMenuService)) { return this._NodeMenuService_4; }
    if ((token === import6.TreeService)) { return this._TreeService_5; }
    return notFoundResult;
  }
  destroyInternal():void {
  }
}
export const TreeModuleNgFactory:import0.NgModuleFactory<import1.TreeModule> = new import0.NgModuleFactory(TreeModuleInjector,import1.TreeModule);
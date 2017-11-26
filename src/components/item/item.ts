import {
  Component, Input, ViewChild, ViewContainerRef,
  ComponentFactoryResolver, ComponentRef, ChangeDetectionStrategy
} from '@angular/core';

import { ComponentsMapping } from '../../../config/components/';
import { Config } from './../../providers';

/*
  Generated class for the List component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'item',
  templateUrl: 'item.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {
  @Input() type: string;
  @Input() options: any;
  @Input() item: any;
  @ViewChild('dynamicComponentTarget', { read: ViewContainerRef })
  dynamicComponentTarget: any;
  componentRef: ComponentRef<any>;

  constructor(
    public componentFactoryResolver: ComponentFactoryResolver,
    public config: Config,
  ) {
  }

  ngOnInit() {
    console.debug('[ITEM] ngOnInit')
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.getComponent());
    this.dynamicComponentTarget.clear();
    this.componentRef = this.dynamicComponentTarget.createComponent(componentFactory);
    this.updateRefs();
  }

  ngOnChanges(changes: any) {
    if (!this.componentRef) {
      return;
    }
    console.debug('[ITEM] ngOnChanges')
    this.updateRefs();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  updateRefs() {
    (<any>this.componentRef.instance).type = this.type;
    (<any>this.componentRef.instance).options = this.options;
    (<any>this.componentRef.instance).item = this.item;
  }

  getComponent(): any {
    const configComponent = this.config.getItemComponent(this.type);
    const { component = '' } = this.options || {};
    // first we check for component from URL, then from Config then naming convention
    const componentName = component || configComponent || `${this.type}-item`;
    const Component = ComponentsMapping[componentName];
    if (Component) return Component;

    throw new Error(`The component "${componentName}" does not exist`);
  }

}

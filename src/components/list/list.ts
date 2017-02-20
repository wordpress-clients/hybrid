import {
  Component, Input, ViewChild, ViewContainerRef,
  ComponentFactoryResolver, ComponentRef, ChangeDetectionStrategy
} from '@angular/core';

import { ComponentsMapping } from './../index';

/*
  Generated class for the List component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'list',
  templateUrl: 'list.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  @Input() type: string;
  @Input() params: any;
  @Input() list: Array<any>;
  @ViewChild('dynamicComponentTarget', { read: ViewContainerRef })
  dynamicComponentTarget: any;
  componentRef: ComponentRef<any>;

  constructor(
    public componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  ngOnChanges(changes: any) {
    if (changes.list.currentValue && (changes.list.currentValue !== changes.list.previousValue)) {
      this.loadComponent();
    }
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  loadComponent() {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.getComponent());
    this.dynamicComponentTarget.clear();
    this.componentRef = this.dynamicComponentTarget.createComponent(componentFactory);
    (<any>this.componentRef.instance).type = this.type;
    (<any>this.componentRef.instance).params = this.params;
    (<any>this.componentRef.instance).list = this.list;
  }

  getComponent(): any {
    const { component = '' } = this.params || {};
    const componentName = component || `${this.type}-list`;
    const Component = ComponentsMapping[componentName];
    if (Component) return Component;

    throw new Error(`The component "${componentName}" does not exists`);
  }

}

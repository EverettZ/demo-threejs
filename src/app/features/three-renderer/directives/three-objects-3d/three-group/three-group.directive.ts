import { Group } from 'three';
import { AfterViewInit, ContentChildren, Directive, QueryList } from '@angular/core';
import { Object3D } from 'three';
import { AbstractLight } from '../../../models/abstract-light';
import { AbstractObject3dDirective } from '../abstract-object-3d/abstract-object-3d.directive';

@Directive({
  selector: 'three-group'
})
export class ThreeGroupDirective extends AbstractObject3dDirective<Group> implements AfterViewInit {

  ngAfterViewInit() {
    this.object = new Group();
    super.ngAfterViewInit();
  }
}

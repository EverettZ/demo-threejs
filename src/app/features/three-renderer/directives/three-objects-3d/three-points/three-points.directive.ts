import { Directive, AfterViewInit, forwardRef, ContentChild, Input, ContentChildren, QueryList } from '@angular/core';
import { Mesh, MeshBasicMaterial, MeshStandardMaterial, Vector3, Object3D, Points } from 'three';
import { AbstractObject3dDirective } from '../abstract-object-3d/abstract-object-3d.directive';
import { AbstractGeometry } from '../../../models/abstract-geometry';
import { AbstractMaterial } from '../../../models/abstract-material';

@Directive
  ({
    selector: 'three-points',
    providers: [{ provide: AbstractObject3dDirective, useExisting: forwardRef(() => ThreePointsDirective) }]
  })
export class ThreePointsDirective extends AbstractObject3dDirective<Points> implements AfterViewInit {
  @ContentChild(AbstractGeometry) geometry: AbstractGeometry<any>;
  @ContentChild(AbstractMaterial) material: AbstractMaterial<any>;
  @ContentChildren(AbstractObject3dDirective) mesh: QueryList<AbstractObject3dDirective<Mesh>>;
  ngAfterViewInit() {
    if (!this.geometry && this.geometry.object) {
      throw new Error("AbstractGeometry content child required");
    }
    if (!this.material && this.material.object) {
      throw new Error("AbstractMaterial content child required");
    }

    this.object = new Points(this.geometry.object, this.material.object);
    super.ngAfterViewInit();
  }
}
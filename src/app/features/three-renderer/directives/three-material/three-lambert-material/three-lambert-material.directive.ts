import { AfterViewInit, forwardRef, Input } from '@angular/core';
import { Directive } from '@angular/core';
import { Color, Side, FrontSide, MeshLambertMaterial, MeshLambertMaterialParameters } from 'three';
import { AbstractMaterial } from '../../../models/abstract-material';

@Directive
  ({
    selector: 'three-lambert-material',
    providers: [{ provide: AbstractMaterial, useExisting: forwardRef(() => ThreeLambertMaterialDirective) }]
  })
export class ThreeLambertMaterialDirective extends AbstractMaterial<MeshLambertMaterial> implements AfterViewInit {

  @Input() params: MeshLambertMaterialParameters;

  ngAfterViewInit() {
    if (!this.params) {
      throw new Error('Mesh params required');
    }
    this.object = new MeshLambertMaterial(this.params);
  }
}
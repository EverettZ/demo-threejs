import { Directive, forwardRef, AfterViewInit, Input } from '@angular/core';
import { Color, FrontSide, MeshPhongMaterial, MeshPhongMaterialParameters, Side, TextureLoader } from 'three';
import { AbstractMaterial } from '../../../models/abstract-material';
import { createGlobeMeshPhongMaterial } from '../../../utils/globe';

@Directive
  ({
    selector: 'three-mesh-phong-material',
    providers: [{ provide: AbstractMaterial, useExisting: forwardRef(() => ThreeMeshPhongMaterialDirective) }]
  })
export class ThreeMeshPhongMaterialDirective extends AbstractMaterial<MeshPhongMaterial> implements AfterViewInit {

  @Input() params: MeshPhongMaterialParameters;


  ngAfterViewInit() {

    if(!this.params) {
      throw new Error('Mesh params required');
    }
    this.object = new MeshPhongMaterial(this.params);

  }
}
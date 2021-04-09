import { AfterViewInit, Directive, forwardRef, Input } from '@angular/core';
import { PlaneGeometry, BufferGeometry, Vector3, BufferAttribute } from 'three';
import { AbstractGeometry } from '../../../models/abstract-geometry';
import { createGlobeSphere, createGlobePlane } from '../../../utils/globe';

@Directive
( {
  selector: 'three-buffer-geometry',
  providers: [ { provide: AbstractGeometry, useExisting: forwardRef( () => ThreeBufferGeometryDirective ) } ]
} )
export class ThreeBufferGeometryDirective extends AbstractGeometry<BufferGeometry> implements AfterViewInit
{
  // some inputs for the sake of example
  @Input() vertices: Vector3[] = [];
  ngAfterViewInit()
  {
    setTimeout(() => {
      this.object = new BufferGeometry();
      if(this.vertices) {
        const arrVertices = [];
        this.vertices.forEach(element => {
          arrVertices.push(element.x, element.y, element.z);
        });
        let attr = new BufferAttribute(new Float32Array(arrVertices), 3)
        this.object.setAttribute('position', attr);
        let x = this.object.getAttribute('position');
        console.log('HELLO',x)
      }
    }, 100);
  }
}
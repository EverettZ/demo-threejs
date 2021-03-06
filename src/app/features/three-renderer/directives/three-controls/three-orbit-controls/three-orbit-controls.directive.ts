import { Directive, Input, AfterViewInit, OnDestroy, ContentChild } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AbstractCamera } from '../../../models/abstract-camera';
import { ThreeRendererComponent } from '../../../components/three-renderer/three-renderer.component';

@Directive({ selector: 'three-orbit-controls' })
export class OrbitControlsDirective implements AfterViewInit, OnDestroy {
  object: OrbitControls;

  @ContentChild(AbstractCamera) camera: AbstractCamera<any>;
  @ContentChild(ThreeRendererComponent) renderer: ThreeRendererComponent;

  @Input() rotateSpeed = 1.0;
  @Input() zoomSpeed = 1.2;

  ngAfterViewInit(): void {
    this.object = new OrbitControls(this.camera.object, this.renderer.canvas);
    this.object.rotateSpeed = this.rotateSpeed;
    this.object.zoomSpeed = this.zoomSpeed;
    this.object.maxDistance = 15000;
    this.object.minDistance = 1;
    // this.object.minDistance = 1;
    this.object.addEventListener('change', this.renderer.render);
  }
  ngOnDestroy() { this.object.dispose(); }
}
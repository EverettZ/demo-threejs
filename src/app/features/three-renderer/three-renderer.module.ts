import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'threejs-meshline';
// Option 2: Import just the parts you need.
import * as THREE from 'three';

import { ThreeRendererComponent } from './components/three-renderer/three-renderer.component';
import { SceneDirective } from './directives/three-objects-3d/scene/scene.directive';
import { AbstractObject3dDirective } from './directives/three-objects-3d/abstract-object-3d/abstract-object-3d.directive';
import { PerspectiveCameraDirective } from './directives/three-camera/perspective-camera/perspective-camera.directive';
import { SphereBufferGeometryDirective } from './directives/three-geometry/sphere-buffer-geometry/sphere-buffer-geometry.directive';
import { MeshDirective } from './directives/three-objects-3d/mesh/mesh.directive';
import { MeshStandardMaterialDirective } from './directives/three-material/standard-material/standard-material.directive';
import { ThreeAmbientLightDirective } from './directives/three-light/three-ambient-light/three-ambient-light.directive';
import { OrbitControlsDirective } from './directives/three-controls/three-orbit-controls/three-orbit-controls.directive';
import { ThreeLambertMaterialDirective } from './directives/three-material/three-lambert-material/three-lambert-material.directive';
import { BoxGeometryDirective } from './directives/three-geometry/three-box-geometry/three-box-geometry.directive';
import { ThreePointLightDirective } from './directives/three-light/three-point-light/three-point-light.directive';
import { ThreeMeshPhongMaterialDirective } from './directives/three-material/three-mesh-phong-material/three-mesh-phong-material.directive';
import { ThreeDirectionalLightDirective } from './directives/three-light/three-directional-light/three-directional-light.directive';
import { ThreeGroupDirective } from './directives/three-objects-3d/three-group/three-group.directive';
import { PlaneGeometryDirective } from './directives/three-geometry/three-plane-geometry/three-plane-geometry.directive';
import { ThreeOrthographicCameraDirective } from './directives/three-camera/three-orthographic-camera/three-orthographic-camera.directive';
import { ThreePointsDirective } from './directives/three-objects-3d/three-points/three-points.directive';
import { PointsMaterialDirective } from './directives/three-material/points-material/points-material.directive';
import { ThreeBufferGeometryDirective } from './directives/three-geometry/three-buffer-geometry/three-buffer-geometry.directive';


@NgModule({
  declarations: [
    ThreeRendererComponent,
    SceneDirective,
    AbstractObject3dDirective,
    PerspectiveCameraDirective,
    SphereBufferGeometryDirective,
    MeshStandardMaterialDirective,
    MeshDirective, 
    ThreeAmbientLightDirective, 
    BoxGeometryDirective, 
    OrbitControlsDirective, 
    ThreeLambertMaterialDirective, 
    ThreePointLightDirective,
    ThreeMeshPhongMaterialDirective,
    ThreeDirectionalLightDirective,
    ThreeGroupDirective,
    PlaneGeometryDirective,
    ThreeOrthographicCameraDirective,
    ThreePointsDirective,
    PointsMaterialDirective,
    ThreeBufferGeometryDirective
  ],
  exports: [
    ThreeRendererComponent,
    SceneDirective,
    AbstractObject3dDirective,
    PerspectiveCameraDirective,
    SphereBufferGeometryDirective,
    MeshStandardMaterialDirective,
    MeshDirective,
    ThreeAmbientLightDirective,
    OrbitControlsDirective,
    ThreeLambertMaterialDirective,
    BoxGeometryDirective,
    ThreePointLightDirective,
    ThreeMeshPhongMaterialDirective,
    ThreeDirectionalLightDirective,
    ThreeGroupDirective,
    PlaneGeometryDirective,
    ThreeOrthographicCameraDirective,
    ThreePointsDirective,
    PointsMaterialDirective,
    ThreeBufferGeometryDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ThreeRendererModule { }

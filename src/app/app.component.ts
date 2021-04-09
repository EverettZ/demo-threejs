// import { AbstractObject3dDirective } from './features/three-renderer/directives/abstract-object-3d/abstract-object-3d.directive';
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mapTo, startWith } from 'rxjs/operators';
import { Vector3, Mesh } from 'three';
import { ThreeRendererComponent } from './features/three-renderer/components/three-renderer/three-renderer.component';
import { AbstractObject3dDirective } from './features/three-renderer/directives/three-objects-3d/abstract-object-3d/abstract-object-3d.directive';
import { GlobeMeshPhongMaterialsParams, CloudsMeshPhongMaterialsParams, StarsMeshBasicMaterialParams, SatelliteMeshBasicMaterialParams } from './features/three-renderer/utils/globe';
import { OrbitControlsDirective } from './features/three-renderer/directives/three-controls/three-orbit-controls/three-orbit-controls.directive';
import * as d3 from 'd3';
import { parseTle } from './features/three-renderer/utils/parse';
import { TwoLineElement } from './features/three-renderer/utils/tle';
import { Clock, clock, OrbitClock } from './features/three-renderer/utils/clock';
import { SatRec } from 'satellite.js';
import { satelliteVector } from './features/three-renderer/utils/animate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  globeMeshPhongMaterialsParams = GlobeMeshPhongMaterialsParams;
  cloudsMeshPhongMaterialsParams = CloudsMeshPhongMaterialsParams;
  starsMeshBasicMaterialParams = StarsMeshBasicMaterialParams;
  satelliteMeshBasicMaterialParams = SatelliteMeshBasicMaterialParams;
  @ViewChild(ThreeRendererComponent) renderer: ThreeRendererComponent;
  @ViewChild(OrbitControlsDirective) controls: OrbitControlsDirective;
  dateTracker = new Date(Date.now());

  private is3d: boolean = true;
  private is3dSource$ = new BehaviorSubject<boolean>(this.is3d);
  is3d$ = this.is3dSource$.asObservable().pipe(
    map(val => {
      this.is3d = val;
      if (val == this.is3d) {
      }
      return this.is3d;
    })
  );

  satellites = [
    {
      name: "satellite1",
      radius: 0.1,
      color: 'orange'
    },
    // {
    //   name: "satellite2",
    //   radius: 0.1,
    //   color: 'red'
    // },
    // {
    //   name: "satellite3",
    //   radius: 0.1,
    //   color: 'blue'
    // },
  ]
  vertices = [];
  loaded = false;

  constructor(private zone: NgZone) {
    Promise.all([
      d3.text('../assets/tles.txt'),
      d3.json('https://unpkg.com/world-atlas@1/world/110m.json'),
    ]).then(ok => {
      this.loaded = true;
      this.initialize(parseTle(ok[0]), ok[1]);
    })
  }
  trackByFn(index: number, item: Vector3) {
    // console.log('trackby!', stuff.)
    return index;
  }
  initialize(parsedTles: string[][], topology) {

    const TLE_DATA_DATE = new Date(Date.now()).getTime();

    const satrecs: SatRec[] = new TwoLineElement()
      .date(TLE_DATA_DATE)
      .satrecs(parsedTles);


    const activeClock = new OrbitClock(100, TLE_DATA_DATE);
    const date = new Date(activeClock.setDate());
    this.vertices = satrecs.map((satrec) => satelliteVector(satrec, date));

    const animate = (t: number) => {
      activeClock.setElapsed(t);
      const d = new Date(activeClock.setDate());
      for (let i = 0; i < satrecs.length; i++) {
        const { x, y, z } = satelliteVector(satrecs[i], d);
        this.vertices[i].x = x;
        this.vertices[i].y = y;
        this.vertices[i].z = z;
      }
      this.dateTracker = d;
      this.controls.object.update();
      this.renderer.render();
    }

    d3.timer(animate);

  }

  ngAfterViewInit() {

    setTimeout(() => {
        const globeMesh = this.renderer.scene.childNodes.find(el => el.name == "globe_mesh");
    
        if (globeMesh) {
          globeMesh.object.rotation.x = -90 / 180 * Math.PI;
        }
      
    }, 1000);

    // https://bl.ocks.org/bwswedberg/29bda412413335b705c434e8a0af1f50


    // might make a performance difference
    // this.zone.runOutsideAngular(_ => {
    //   var t = 0;
    //   const animate = () => {
    //     setTimeout(function () {

    //       requestAnimationFrame(animate);

    //     }, 1000 / 30);

    //     const satellite1 = this.renderer.scene.childNodes.find(item => item.name == 'satellite1');
    //     const satellite2 = this.renderer.scene.childNodes.find(item => item.name == 'satellite2');
    //     const satellite3 = this.renderer.scene.childNodes.find(item => item.name == 'satellite3');
    //     const satellite4 = this.renderer.scene.childNodes.find(item => item.name == 'satellite4');
    //     const globe = this.renderer.scene.childNodes.find(item => item.name == 'globe_mesh');
    //     const clouds = this.renderer.scene.childNodes.find(item => item.name == 'clouds_mesh');
    //     if (globe) {

    //       t += 0.01;

    //       const widthHalf = 0.5 * this.renderer.canvas.width;
    //       const heightHalf = 0.5 * this.renderer.canvas.height;
    //       const x = 10.5 * Math.cos(t) + 0;
    //       const y = 10.5 * Math.sin(t) + 0;
    //       const z = 10.5 * Math.sin(t) + 0;

    //       if (this.is3d) {
    //         if (satellite1) {
    //           satellite1.object.position.x = x;
    //           satellite1.object.position.y = y;
    //           console.log("x", x)
    //           console.log("y", x)
    //         }
    //         if (satellite2) {
    //           satellite2.object.position.y = 10.5 * Math.cos(t) + 0;
    //           satellite2.object.position.z = 10.5 * Math.sin(t) + 0;
    //         }
    //         if (satellite3) {
    //           satellite3.object.position.y = 10.5 * Math.cos(t) + 0;
    //           satellite3.object.position.x = 10.5 * Math.sin(t) + 0;
    //         }
    //         if (satellite4) {
    //           satellite4.object.position.x = 11 * Math.sin(t) + 0;
    //           satellite4.object.position.y = 11 * Math.cos(t) + 0;
    //           // satellite4.object.position.z = 11 * Math.sin(t) + 0;
    //         }
    //       } else {

    //         if (satellite1) {
    //           satellite1.object.position.x = (x);
    //           satellite1.object.position.y = - (y);
    //           satellite1.object.position.z = 10
    //         }
    //       }
    //       // globe.object.rotation.y -= 0.005;
    //       // clouds.object.rotation.y -= 0.005;
    //       // clouds.object.rotation.x -= 0.001;
    //       // pivotPoint.object.rotateOnAxis(new Vector3(0, 3, 0), 0.1)
    //       // pivotPoint.object.rotateOnWorldAxis(new Vector3(0,0,2),0.1)
    //     }

    //     this.renderer.render();
    //     // requestAnimationFrame(animate);
    //   };
    //   animate();
    // })
  }

  toggleDimension() {
    this.is3dSource$.next(!this.is3d);
    this.renderer.scene.object.updateMatrix();
    this.renderer.renderer.dispose();
    setTimeout(() => {
      this.controls.object.object.position.z = 30;
      // this.controls.object.enablePan = false;
      // this.controls.object.enableRotate = false;
      // this.controls.object.screenSpacePanning = true;
      // this.renderer.camera.object.updateMatrix();
    });

    // this.satellites.push(
    //   {
    //     name: "satellite4",
    //     radius: 0.1,
    //     color: 'purple'
    //   })
  }
}

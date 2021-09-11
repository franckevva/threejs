import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SceneComponent } from './scene.component';
import { CubeComponent } from './cube/cube.component';
import { SceneRoutingModule } from './scene.routing';
import { FirstComponent } from './first/first.component';

@NgModule({
  declarations: [SceneComponent, CubeComponent, FirstComponent],
  imports: [CommonModule, SceneRoutingModule],
})
export class SceneModule {}

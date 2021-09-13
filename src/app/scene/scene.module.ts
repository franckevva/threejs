import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClient } from '@angular/common/http';

import { SceneComponent } from './scene.component';
import { CubeComponent } from './cube/cube.component';
import { SceneRoutingModule } from './scene.routing';
import { FirstComponent } from './first/first.component';

@NgModule({
  declarations: [SceneComponent, CubeComponent, FirstComponent],
  imports: [CommonModule, SceneRoutingModule, MatProgressBarModule],
})
export class SceneModule {}

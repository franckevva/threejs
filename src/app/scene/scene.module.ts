import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { SceneRoutingModule } from './scene.routing';
import { SceneComponent } from './scene.component';
import { CubeComponent } from './cube/cube.component';
import { BookSceneComponent } from './book/book.component';

@NgModule({
  declarations: [SceneComponent, CubeComponent, BookSceneComponent],
  imports: [CommonModule, SceneRoutingModule, MatProgressBarModule],
})
export class SceneModule {}

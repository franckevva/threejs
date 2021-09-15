import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CubeComponent } from './cube/cube.component';
import { BookSceneComponent } from './book/book.component';
import { SceneComponent } from './scene.component';

const routes: Routes = [
  {
    path: '',
    component: SceneComponent,
    children: [
      {
        path: 'cube',
        component: CubeComponent,
      },
      {
        path: 'book',
        component: BookSceneComponent,
      },
      {
        path: '',
        redirectTo: 'book',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SceneRoutingModule {}

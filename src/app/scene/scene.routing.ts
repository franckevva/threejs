import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CubeComponent } from './cube/cube.component';
import { FirstComponent } from './first/first.component';
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
        path: 'first',
        component: FirstComponent,
      },
      {
        path: '',
        redirectTo: 'cube',
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'scene',
    loadChildren: () =>
      import('./scene/scene.module').then((m) => m.SceneModule),
  },
  { path: '404', component: NotFoundComponent },
  { path: '', pathMatch: 'full', redirectTo: 'scene' },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

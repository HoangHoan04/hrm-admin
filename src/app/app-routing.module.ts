import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { ComingSoonComponent } from './pages/other/coming-soon/coming-soon.component';
import { NotFoundComponent } from './pages/other/not-found/not-found.component';
import { ServerErrorComponent } from './pages/other/server-error/server-error.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // Auth routes under /auth prefix (no layout)
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },

  // Error / utility routes (public, no layout)
  { path: '500', component: ServerErrorComponent },
  { path: 'coming-soon', component: ComingSoonComponent },

  // Protected routes with layout (guarded by AuthGuard)
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/main/main.module').then((m) => m.MainModule),
  },

  // Catch-all (404)
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

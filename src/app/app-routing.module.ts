import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReportPageComponent } from './report-page/report-page.component';
import { AuthGuardService } from './services/Auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'report',
    component: ReportPageComponent,
    canActivate: [AuthGuardService]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

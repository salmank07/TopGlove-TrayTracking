import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';
import { AdduserComponent } from './adduser/adduser.component';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
  },
  {
    path: 'addUser',
    component: AdduserComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}

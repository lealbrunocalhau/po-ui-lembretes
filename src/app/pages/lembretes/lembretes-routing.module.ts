import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LembretesFormComponent } from './lembretes-form/lembretes-form.component';
import { LembretesListComponent } from './lembretes-list/lembretes-list.component';

const routes: Routes = [
  { path: '', component: LembretesListComponent},
  { path: 'new', component: LembretesFormComponent},
  { path: ':id/edit', component: LembretesFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LembretesRoutingModule { }

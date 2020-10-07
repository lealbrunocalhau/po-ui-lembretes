import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { LembretesRoutingModule } from './lembretes-routing.module';
import { LembretesFormComponent } from './lembretes-form/lembretes-form.component';
import { LembretesListComponent } from './lembretes-list/lembretes-list.component';
import { PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { PoModule } from '@po-ui/ng-components';
import { PoPageModule } from '@po-ui/ng-components';
import { PoDividerModule } from '@po-ui/ng-components';

@NgModule({
  declarations: [LembretesFormComponent, LembretesListComponent],
  imports: [
    PaginationModule,
    SharedModule,
    LembretesRoutingModule,
    PoModule,
    PoPageDynamicSearchModule,
    PoPageModule,
    PoDividerModule
  ]
})
export class LembretesModule { }

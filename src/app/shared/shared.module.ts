import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { TableCustomComponent } from './components/table-custom/table-custom.component';

@NgModule({
  declarations: [
    TableCustomComponent,
  ],
  imports: [
    TranslatePipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NzLayoutModule,
    NzIconModule,
    NzDropDownModule,
    NzAvatarModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzCardModule,
    NzDrawerModule,
    NzSwitchModule,
    NzSelectModule,
    NzSliderModule,
    NzInputModule,
    NzInputNumberModule,
    NzDividerModule,
    NzButtonModule,
    NzTooltipModule,
    NzTableModule,
    NzModalModule,
    NzFormModule,
    NzSpinModule,
  ],
  exports: [
    TableCustomComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslatePipe,
    NzLayoutModule,
    NzIconModule,
    NzDropDownModule,
    NzAvatarModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzCardModule,
    NzDrawerModule,
    NzSwitchModule,
    NzSelectModule,
    NzSliderModule,
    NzInputModule,
    NzInputNumberModule,
    NzDividerModule,
    NzButtonModule,
    NzTooltipModule,
    NzTableModule,
    NzModalModule,
    NzFormModule,
    NzSpinModule,
  ],
})
export class SharedModule {}

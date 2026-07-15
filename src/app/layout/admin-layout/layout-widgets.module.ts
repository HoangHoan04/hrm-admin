import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ChangeLanguageComponent } from './change-language/change-language.component';
import { ToggleThemeComponent } from './toggle-theme/toggle-theme.component';

@NgModule({
  declarations: [ChangeLanguageComponent, ToggleThemeComponent],
  imports: [CommonModule, TranslatePipe, NzDropdownModule, NzIconModule, NzMenuModule],
  exports: [ChangeLanguageComponent, ToggleThemeComponent],
})
export class LayoutWidgetsModule {}

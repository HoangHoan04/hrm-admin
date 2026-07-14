import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ChangeLanguageComponent } from './change-language/change-language.component';
import { ConfigSettingComponent } from './config-setting/config-setting.component';
import { FooterComponent } from './footer/footer.component';
import { FullscreenComponent } from './fullscreen/fullscreen.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TabsBarComponent } from './tabs-bar/tabs-bar.component';
import { ToggleThemeComponent } from './toggle-theme/toggle-theme.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    BreadcrumbComponent,
    ChangeLanguageComponent,
    ConfigSettingComponent,
    FooterComponent,
    FullscreenComponent,
    NavbarComponent,
    SearchBoxComponent,
    SidebarComponent,
    TabsBarComponent,
    ToggleThemeComponent,
  ],
  imports: [SharedModule],
})
export class AdminLayoutModule {}

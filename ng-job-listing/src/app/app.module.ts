import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
import { LayoutComponent } from './layout/layout.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ListComponent, LayoutComponent, FilterComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

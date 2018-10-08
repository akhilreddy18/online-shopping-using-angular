import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MockShirtDetailsService } from './services/mock-shirt.service';
import { HttpClientModule } from '@angular/common/http';
import { ListViewComponent } from './list-view/list-view.component';
import { FilterViewComponent } from './filter-view/filter-view.component';
import { ListViewDetailsComponent } from './list-view-details/list-view-details.component';


@NgModule({
  declarations: [
    AppComponent,
    ListViewComponent,
    FilterViewComponent,
    ListViewDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxSpinnerModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    MockShirtDetailsService
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

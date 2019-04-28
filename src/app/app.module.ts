import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TableviewComponent } from './tableview/tableview.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DetailComponent } from './detail/detail.component';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/multiselect';
import {SliderModule} from 'primeng/slider';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { StatusPipe } from './custome-decorator.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailComponent,
    TableviewComponent,
    UpdateuserComponent,
    StatusPipe
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    MultiSelectModule,
    SliderModule,
    CalendarModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

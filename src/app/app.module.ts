import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print'; //old
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { NgxBarcode6Module } from 'ngx-barcode6';

import { HomeComponent } from './home/home.component';
import { ModalComponent } from './components/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NewrimComponent } from './newrim/newrim.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FileuploadComponent } from './components/fileupload/fileupload.component';
import { NewbrandComponent } from './newbrand/newbrand.component';
import { RimsComponent } from './rims/rims.component';
import { GreenprintComponent } from './components/greenprint/greenprint.component';

import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NewuserComponent } from './newuser/newuser.component';
import { UsersComponent } from './users/users.component';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModalComponent,
    NewrimComponent,
    FileuploadComponent,
    NewbrandComponent,
    RimsComponent,
    GreenprintComponent,
    NewuserComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPrintModule,
    NgxBarcode6Module,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [MatGridListModule],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

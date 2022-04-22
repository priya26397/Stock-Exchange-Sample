import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { ViewCompanyComponent } from './company/view-company/view-company.component';
import { HeaderComponent } from './header/header.component';
import { AppInterceptor } from './services/app.interceptor';
import { AddStockComponent } from './stock/add-stock/add-stock.component';
import { ViewStockComponent } from './stock/view-stock/view-stock.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/summary', pathMatch: 'full' },
  { path: 'summary', component: ViewStockComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'viewcompany', component: ViewCompanyComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'company', component: AddCompanyComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'stock', component: AddStockComponent, canActivate: [CanActivateRouteGuard] },

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddCompanyComponent,
    AddStockComponent,
    ViewStockComponent,
    ViewCompanyComponent,
    HeaderComponent,
    RegisterComponent,

  ],
  imports: [BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatSidenavModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSnackBarModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )],
  bootstrap: [AppComponent],
  providers: [DatePipe, CanActivateRouteGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true
  }],
  entryComponents: [],
  exports: [RouterModule]
})

export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppointmetsComponent } from './appointmets/appointmets.component';
import { ProfileComponent } from './profile/profile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, FormControlDirective } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NgMaterialMultilevelMenuModule, ɵb } from 'ng-material-multilevel-menu';
import { HomeComponent } from './home/home.component';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table'; 
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CreateAppointmentsComponent } from './appointmets/create-appointments/create-appointments.component';
import { DeleteAppointmentsComponent } from './appointmets/delete-appointments/delete-appointments.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';



const routes: Routes = [
  { path: '', component: LayoutComponent, 
    children: [
      { path: '', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'appointments', component: AppointmetsComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      ]
    }
  ]

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    AppointmetsComponent,
    ProfileComponent,
    HomeComponent,
    CreateAppointmentsComponent,
    DeleteAppointmentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    NgMaterialMultilevelMenuModule,
    MatListModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule

  ],
  providers: [ɵb , HttpClientModule, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

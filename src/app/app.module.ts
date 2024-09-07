import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { GroupAdminDashboardComponent } from './components/group-admin-dashboard/group-admin-dashboard.component';
import { SuperAdminDashboardComponent } from './components/super-admin-dashboard/super-admin-dashboard.component';
import { CommonModule } from '@angular/common'; 
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    UserDashboardComponent,
    GroupAdminDashboardComponent,
    SuperAdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }


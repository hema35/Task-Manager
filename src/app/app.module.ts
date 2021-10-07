import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { JwtUnAuthorizedInterceptorService } from './jwt-un-authorized-interceptor.service';
import { JwtModule } from '@auth0/angular-jwt';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { PagingPipe } from './paging.pipe';




@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    SignUpComponent,
    TasksComponent,
    PagingPipe,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>{
          return(sessionStorage.getItem("currentUser")?JSON.parse(sessionStorage.getItem("currentUser")as string).token:null)
        }
      }
    })
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:JwtInterceptorService,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:JwtUnAuthorizedInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

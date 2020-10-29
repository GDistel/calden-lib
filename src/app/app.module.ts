import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CaldenAuthConfig } from 'projects/calden-lib/src/lib/auth/auth.config';

const caldenAuthConfig = {
  urls: {
    token: 'token/',
    refreshToken: 'token/refresh/',
    authGuardRedirect: '/auth-async',
    logoutRedirect: ''
  }
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: CaldenAuthConfig,
      useValue: caldenAuthConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

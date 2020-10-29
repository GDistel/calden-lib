import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CaldenAuthComponent } from './auth.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CaldenAuthConfig } from './auth.config';

const authConfig = {
  urls: {
    token: 'token/',
    refreshToken: 'token/refresh/',
    logoutRedirect: '',
    authGuardRedirect: ''
  }
};

@NgModule({
  declarations: [CaldenAuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatInputModule,
    FlexLayoutModule
  ],
  exports: [CaldenAuthComponent],
  providers: [
    {
      provide: CaldenAuthConfig,
      useValue: authConfig
    }
  ]
})
export class CaldenAuthModule { }

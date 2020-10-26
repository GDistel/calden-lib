import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CaldenAuthModule } from 'projects/calden-lib/src/public-api';
import { SharedModule } from '../shared.module';
import { AuthComponent } from './auth.component';
import { AuthSuccessComponent } from './auth-success.component';
import { AuthenticationGuard } from './authentication.guard';

@NgModule({
  declarations: [
    AuthComponent,
    AuthSuccessComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent
      },
      {
        path: 'auth-success',
        component: AuthSuccessComponent,
        canActivate: [AuthenticationGuard]
      }
    ]),
    SharedModule,
    CaldenAuthModule
  ],
})
export class AuthModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CaldenAuthModule } from 'projects/calden-lib/src/public-api';
import { SharedModule } from '../shared.module';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent
      }
    ]),
    SharedModule,
    CaldenAuthModule
  ],
})
export class AuthModule { }

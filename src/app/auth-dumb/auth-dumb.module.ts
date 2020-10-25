import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthDumbComponent } from './auth-dumb.component';
import { CaldenAuthModule } from 'projects/calden-lib/src/public-api';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    AuthDumbComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthDumbComponent
      }
    ]),
    SharedModule,
    CaldenAuthModule
  ],
})
export class AuthDumbModule { }

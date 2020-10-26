import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-success',
  template: `
    <p>You are logged in.</p>
    <p>You can only see this page because you have authenticated. The routeguard is working.</p>
    <button mat-raised-button color="primary" (click)="goBack()">GO BACK</button>
  `,

})
export class AuthSuccessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.router.navigate(['auth-async']);
  }
}

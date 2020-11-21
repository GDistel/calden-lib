import { AuthRequest } from './../../../../../dist/calden-lib/src/lib/auth/auth.interfaces.d';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CaldenAuthModule } from './auth.module';
import { CaldenAuthComponent } from './auth.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ValidationErrors } from '@angular/forms';


describe('Test CaldenAuthComponent', () => {

    let component: CaldenAuthComponent;
    let fixture: ComponentFixture<CaldenAuthComponent>;
    let el: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CaldenAuthModule, NoopAnimationsModule]
        }).compileComponents()
        .then(() => {
            fixture = TestBed.createComponent(CaldenAuthComponent);
            component = fixture.componentInstance;
            el = fixture.debugElement;
        });
    }));

    it('should create the calden auth component', () => {
        expect(component).toBeTruthy();
    });

    it('should show the corresponding logo', () => {
      component.logo = 'assets/my_logo.png';
      fixture.detectChanges();
      const logoImg = el.query(By.css('img'));
      expect(logoImg.nativeElement.src).toContain('assets/my_logo.png');
    });

    it('should show the spinner to indicate loading', () => {
      component.isLoading = true;
      fixture.detectChanges();
      const spinner = el.query(By.css('mat-spinner'));
      expect(spinner.nativeElement).toBeTruthy();
      component.isLoading = false;
      fixture.detectChanges();
      const spinnerOff = el.query(By.css('mat-spinner'));
      expect(spinnerOff).toBeFalsy();
    });

    it('should show the confirm signup message', () => {
      component.confirmSignup = true;
      fixture.detectChanges();
      const confirmSignupMessage = el.query(By.css('.confirm-registration'));
      const backToLoginBtn = el.query(By.css('.back-to-login-btn'));
      expect(confirmSignupMessage.nativeElement).toBeTruthy();
      expect(backToLoginBtn.nativeElement).toBeTruthy();
    });

    it('should properly handle the default validity rules for the password control', () => {
      component.context = 'sign up';
      fixture.detectChanges();
      const password = component.form.controls.password;

      expect(password.valid).toBeFalse();
      expect(password.errors.required).toBeTrue();

      password.setValue('abcd');
      expect(password.valid).toBeFalse();
      expect(password.errors.minlength).toEqual({requiredLength: 8, actualLength: 4});

      component.form.controls.password.markAsTouched();
      fixture.detectChanges();
      const passLengthHint = el.query(By.css('mat-error'));
      expect(passLengthHint.nativeElement.innerText).toEqual('Must be at least 8 characters long');

      password.setValue('abcdgggg');
      expect(password.valid).toBeTrue();
    });

    it('should adjust the password validity rules according to component input data', () => {
      component.context = 'sign up';
      component.minPasswordLength = 4;
      fixture.detectChanges();
      const password = component.form.controls.password;

      password.setValue('abcd');
      expect(password.valid).toBeTrue();

      component.form.controls.password.markAsTouched();
      fixture.detectChanges();
      const passLengthHint = el.query(By.css('mat-error'));
      expect(passLengthHint).toBeFalsy();
    });

    it('should error if the password length inputed by the user does not respect the validation rule', () => {
      component.context = 'sign up';
      component.minPasswordLength = 4;
      fixture.detectChanges();
      const password = component.form.controls.password;

      password.setValue('abc');
      expect(password.valid).toBeFalse();

      component.form.controls.password.markAsTouched();
      fixture.detectChanges();
      const passLengthHint = el.query(By.css('mat-error'));
      expect(passLengthHint.nativeElement.innerText).toEqual('Must be at least 4 characters long');
    });

    it('should properly handle the default validity rules for the username control', () => {
      component.context = 'sign up';
      fixture.detectChanges();
      const username = component.form.controls.username;

      expect(username.valid).toBeFalse();
      expect(username.errors.required).toBeTrue();

      username.setValue('johnATcompany.com');
      expect(username.valid).toBeFalse();
      expect(username.errors.pattern).toEqual({requiredPattern: '^[^ @]+@[^ @]+$', actualValue: 'johnATcompany.com'});

      component.form.controls.username.markAsTouched();
      fixture.detectChanges();
      const usernameLengthHint = el.query(By.css('mat-error'));
      expect(usernameLengthHint.nativeElement.innerText).toContain('Not a valid username format');

      username.setValue('john@company.com');
      expect(username.valid).toBeTrue();
    });

    it('should adjust the username validity rules according to component input data', () => {
      component.context = 'sign up';
      component.usernameValidPattern = '';
      fixture.detectChanges();
      const username = component.form.controls.username;

      username.setValue('abcd');
      expect(username.valid).toBeTrue();

      component.form.controls.username.markAsTouched();
      fixture.detectChanges();
      const usernameLengthHint = el.query(By.css('mat-error'));
      expect(usernameLengthHint).toBeFalsy();
    });

    it('should show invalid credentials according to component input data', () => {
      let invalidCredentialsMessage: DebugElement;
      invalidCredentialsMessage = el.query(By.css('.invalid-credentials'));
      expect(invalidCredentialsMessage).toBeFalsy();

      component.invalidCredentials = true;
      fixture.detectChanges();
      invalidCredentialsMessage = el.query(By.css('.invalid-credentials'));
      expect(invalidCredentialsMessage).toBeTruthy();
    });

    it('should emit the "forgot password" event', () => {
      component.forgotPassword.subscribe((ev: void) => expect(ev).toBeUndefined());
      fixture.detectChanges();
      const forgotPasswordLink = el.query(By.css('.further-options > a'));
      forgotPasswordLink.nativeElement.click();
    });

    it('should emit the auth request event upon login request', () => {
      const expectedAuthRequest = {
        context: 'login',
        username: 'john',
        password: 'abc1234',
        remember: false
      };
      component.authRequest.subscribe((req: AuthRequest) => {
        expect(req).toBeTruthy();
        expect((req as any)).toEqual(expectedAuthRequest);
      });
      fixture.detectChanges();
      const username = component.form.controls.username;
      username.setValue('john');
      component.form.controls.username.markAsTouched();

      const password = component.form.controls.password;
      password.setValue('abc1234');
      component.form.controls.password.markAsTouched();

      const loginBtn = el.query(By.css('.login-btn'));
      loginBtn.nativeElement.click();
    });

});

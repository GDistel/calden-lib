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

    it('should adjust the password validity rules according to the input data - no errors', () => {
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

    it('should adjust the password validity rules according to the input data - errors', () => {
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

});

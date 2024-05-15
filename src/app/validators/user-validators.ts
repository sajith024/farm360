import { AbstractControl, FormGroup } from '@angular/forms';

export class UserValidators {
  static emailValidator(value: AbstractControl) {
    const emailPattern = /^[\w\-\.]+@[\w-]+\.[^\d\s-]{2,4}$/;

    if (!emailPattern.test(value.value)) {
      return {
        email: true,
      };
    }

    return null;
  }

  static passwordValidator(value: AbstractControl) {
    // Minimum eight characters, at least one letter, one number and one special character
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!passwordPattern.test(value.value)) {
      return {
        password: true,
      };
    }

    return null;
  }

  static nameValidator(value: AbstractControl) {
    const namePattern = /^[A-Za-z]+ ?[A-Za-z]+$/;
    if (!namePattern.test(value.value)) {
      return {
        name: true,
      };
    }

    return null;
  }

  static phoneNumberValidator(value: AbstractControl) {
    const namePattern = /^\d{6,14}$/;
    if (!namePattern.test(value.value)) {
      return {
        phone: true,
      };
    }

    return null;
  }

  static passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmpassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
}

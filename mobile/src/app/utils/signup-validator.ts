import { AbstractControl } from '@angular/forms';

export class SignUpValidator {
  constructor() {}
  NAME_PATTERN: RegExp = new RegExp(
    '^[a-zA-Zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ]{2,}$',
  );
  EMAIL_PATTERN: RegExp = new RegExp(
    '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]{2,})\\.([a-zA-Z]{2,6})$',
  );
  SPECIAL_CHAR_PATTERN = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  validateName(name: string): boolean {
    return this.NAME_PATTERN.test(name);
  }

  validatePassword(password: string): boolean {
    return this.hasValidLength(password) && this.hasCorrectStructure(password);
  }

  hasValidLength(str: string, len: number = 8): boolean {
    return str === null ? false : str.length >= len;
  }

  hasUpperLetter(str: string): boolean {
    return new RegExp('[A-Z]').test(str);
  }

  hasLowerLetter(str: string): boolean {
    return new RegExp('[a-z]').test(str);
  }

  hasNumber(str: string): boolean {
    return new RegExp('[0-9]').test(str);
  }

  hasSpecialChar(str: string): boolean {
    return this.SPECIAL_CHAR_PATTERN.test(str);
  }

  hasCorrectStructure(str: string): boolean {
    return (
      this.hasNumber(str) &&
      this.hasUpperLetter(str) &&
      this.hasLowerLetter(str)
    );
  }

  hasValidEmail(email: string): boolean {
    return this.EMAIL_PATTERN.test(email);
  }

  validateInfos(infos: any): boolean {
    let isValid = false;
    if (
      this.validateName(infos.firstname) &&
      this.validateName(infos.lastname) &&
      this.hasValidEmail(infos.email) &&
      this.validatePassword(infos.password)
    ) {
      isValid = true;
    }
    return isValid;
  }

  customPasswordValidator(control: AbstractControl) {
    if (
      control.value === null ||
      !new SignUpValidator().validatePassword(control.value)
    ) {
      return { validPassword: true };
    }
    return null;
  }
}

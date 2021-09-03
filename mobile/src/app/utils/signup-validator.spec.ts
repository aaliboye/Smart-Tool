import { SignupValidator } from './signup-validator';

describe('SignupValidator', () => {
  const signupValidator = new SignupValidator();

  it('should create an instance', () => {
    expect(new SignupValidator()).toBeTruthy();
  });

  describe('Name', () => {
    it('should only contain letters or characters', () => {
      expect(signupValidator.validateName('Abigael')).toBeTruthy();
    });

    it('should authorize accent', () => {
      expect(signupValidator.validateName('Aïda')).toBeTruthy();
    });

    it('should have more than one character', () => {
      expect(signupValidator.validateName('Al')).toBeTruthy();
    });

    it('should not have one character', () => {
      expect(signupValidator.validateName('a')).toBeFalsy();
    });

    it('should not have number', () => {
      expect(signupValidator.validateName('Rafael45')).toBeFalsy();
    });

    it('should not authorize empty string', () => {
      expect(signupValidator.validateName('')).toBeFalsy();
    });
  });

  describe('Email Address', () => {
    it('should be valid', () => {
      expect(signupValidator.hasValidEmail('test@test.com')).toBeTruthy();
    });

    it('should not accept invalid email', () => {
      expect(signupValidator.hasValidEmail('test@.com')).toBeFalsy();
      expect(signupValidator.hasValidEmail('@.com')).toBeFalsy();
      expect(signupValidator.hasValidEmail('re@re.com')).toBeTruthy();
    });

    it('should be required', () => {
      expect(signupValidator.hasValidEmail('')).toBeFalsy();
    });
  });

  describe('Password', () => {
    it('should be required', () => {
      expect(signupValidator.hasCorrectStructure('')).toBeFalsy();
    });

    it('should have upper letter', () => {
      expect(signupValidator.hasUpperLetter('Test')).toBeTruthy();
      expect(signupValidator.hasUpperLetter('teSt')).toBeTruthy();
      expect(signupValidator.hasUpperLetter('test')).toBeFalsy();
      expect(signupValidator.hasUpperLetter('')).toBeFalsy();
      expect(signupValidator.hasUpperLetter('TEST')).toBeTruthy();
    });

    it('should have lower letter', () => {
      expect(signupValidator.hasLowerLetter('artist')).toBeTruthy();
      expect(signupValidator.hasLowerLetter('ArtIst')).toBeTruthy();
      expect(signupValidator.hasLowerLetter('')).toBeFalsy();
      expect(signupValidator.hasLowerLetter('ARTIST')).toBeFalsy();
    });

    it('should have number', () => {
      expect(signupValidator.hasNumber('artist')).toBeFalsy();
      expect(signupValidator.hasNumber('ArtIst45')).toBeTruthy();
      expect(signupValidator.hasNumber('')).toBeFalsy();
    });

    it('should have special character', () => {
      expect(signupValidator.hasSpecialChar('')).toBeFalsy();
      expect(signupValidator.hasSpecialChar('passer')).toBeFalsy();
      expect(signupValidator.hasSpecialChar('passer123')).toBeFalsy();
      expect(signupValidator.hasSpecialChar('123456')).toBeFalsy();
      expect(signupValidator.hasSpecialChar('passer@123')).toBeTruthy();
      expect(signupValidator.hasSpecialChar('test!fy')).toBeTruthy();
      expect(signupValidator.hasSpecialChar('#avent')).toBeTruthy();
      expect(signupValidator.hasSpecialChar('p$assed!')).toBeTruthy();
    });

    it('should have more than 8 characters', () => {
      expect(signupValidator.hasValidLength('')).toBeFalsy();
      expect(signupValidator.hasValidLength('passer')).toBeFalsy();
      expect(signupValidator.hasValidLength('passer123')).toBeTruthy();
      expect(signupValidator.hasValidLength('passer12')).toBeTruthy();
      expect(signupValidator.hasValidLength('12345678')).toBeTruthy();
    });

    it('should be valid with a correct structure', () => {
      expect(signupValidator.validatePassword('')).toBeFalsy();
      expect(signupValidator.validatePassword('passer123')).toBeFalsy();
      expect(signupValidator.validatePassword('P@sser2')).toBeFalsy();
      expect(signupValidator.validatePassword('p@sser23')).toBeFalsy();
      expect(signupValidator.validatePassword('123456')).toBeFalsy();
      expect(signupValidator.validatePassword('P@sser123')).toBeTruthy();
      expect(signupValidator.validatePassword('#appy4Pb')).toBeTruthy();
    });
  });
});

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonSlides, LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { AuthService } from '../providers/auth.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ActivationGpsService } from '../providers/activation-gps-service';
import { SIMULATION } from 'src/environments/environment';

@Component({
  selector: 'app-validation-phone',
  templateUrl: './validation-phone.page.html',
  styleUrls: ['./validation-phone.page.scss'],
})
export class ValidationPhonePage implements OnInit {
  validationPhone: FormGroup;
  @ViewChild('slideValidationPhone', { static: true }) slides: IonSlides;
  configOtpInput = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    inputStyles: {
      width: '50px',
      height: '50px',
      border: 'solid 1px #ccc',
      'border-radius': '0px',
    },
  };
  code: any;
  codeArray = [];
  isCodeReady = false;
  inputPhoneConfig = {
    country: null,
    hasError: true,
  };
  countriesPhoneCode: Array<any>;
  isCodeValid = true;
  loading: any;

  displayResentCode = false;
  countDown = 1;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loadingController: LoadingController,
    public router: Router,
    public geolocation: Geolocation,
    public activationGpsService: ActivationGpsService,
  ) { }

  ngOnInit() {
    this.validationPhone = this.formBuilder.group({
      phone: ['', Validators.required],
      dialCode: ['+221'],
    });
    this.slides.lockSwipes(true).then();
  }

  formatCountDown() {
    return moment.utc(this.countDown).format('mm:ss');
  }

  startCountdown(seconds) {
    let counter = seconds;
    const interval = setInterval(() => {
      counter -= 1000;
      this.countDown = counter;
      if (counter < 0) {
        clearInterval(interval);
        this.displayResentCode = true;
      }
    }, 1000);
  }

  async presentLoading(message) {
    this.loading = await this.loadingController.create({
      message,
    });
    await this.loading.present();
  }

  resetErrorInputPhone() {
    this.inputPhoneConfig.hasError = true;
  }

  goToSlideBack() {
    this.slides.lockSwipes(false).then(() => {
      this.slides.slidePrev();
      this.slides.lockSwipes(true).then();
    });
  }

  inputPhoneHasError(hasError: boolean) {
    this.inputPhoneConfig = {
      ...this.inputPhoneConfig,
      hasError,
    };
  }

  onCountryChange({ dialCode }) {
    this.validationPhone.setValue({ dialCode, phone: '' });
  }

  slideToCodeVerification(resubmit = false) {
    if (SIMULATION) {
      this.authService.saveToken('776359893');
      this.authService.saveIdUser('myID');
      this.slides.lockSwipes(false).then(() => {
        this.slides.slideNext();
        this.slides.lockSwipes(true).then();
      });
    }
    else {
      if (!this.inputPhoneConfig.hasError) {
        return;
      }
      this.presentLoading('Envoie en cours...');
      this.authService
        .register({
          phone: `${this.validationPhone.value.dialCode}${this.validationPhone.value.phone}`,
        })
        .subscribe(
          (res: any) => {
            this.loading.dismiss();
            console.log(res);
            this.authService.saveToken(res.token);
            this.authService.saveIdUser(res.idUser);
            console.log('validation phone = ' + res.idUser);
            this.displayResentCode = false;
            this.startCountdown(1 * 60 * 1000);
            if (!resubmit) {
              this.slides.lockSwipes(false).then(() => {
                this.slides.slideNext();
                this.slides.lockSwipes(true).then();
              });
            }
          },
          (err) => {
            this.loading.dismiss();
            alert('Une erreur est survenue. Merci de réessayer.');
          },
        );
    }
  }

  verifyOtp() {
    if (SIMULATION) {
      this.slides.lockSwipes(false).then(() => {
        //this.loading.dismiss();
        this.slides.slideNext();
        this.slides.lockSwipes(true).then();
      });
    }
    else {
      this.isCodeValid = true;
      if (!this.isCodeReady) {
        return;
      }
      this.codeArray = this.code.split('');
      this.presentLoading('Vérification en cours...');
      this.authService.validateCode(this.code).subscribe(
        (res) => {
          this.slides.lockSwipes(false).then(() => {
            this.loading.dismiss();
            this.slides.slideNext();
            this.slides.lockSwipes(true).then();
          });
        },
        (err) => {
          this.loading.dismiss();
          alert('Code invalide.');
        },
      );
    }
  }

  setOtpValue(otp: string) {
    this.code = otp;
    this.isCodeReady = this.code.length === 4;
  }

  gotoGeolocalisation() {
    this.activationGpsService.checkGPSPermission();
  }

  gotoWelcome() {
    this.router.navigateByUrl('/welcome');
  }

}

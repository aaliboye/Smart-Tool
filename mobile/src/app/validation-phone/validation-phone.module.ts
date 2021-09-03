import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { IonicModule } from '@ionic/angular';
import { ValidationPhonePage } from './validation-phone.page';
import { RouterModule } from '@angular/router';
import { Ng2TelInputModule } from 'ng2-tel-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    Ng2TelInputModule,
    RouterModule.forChild([
      {
        path: '',
        component: ValidationPhonePage,
      },
    ]),
  ],
  declarations: [ValidationPhonePage]
})
export class ValidationPhonePageModule { }

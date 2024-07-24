import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountActivationComponent } from './account-activation/account-activation.component';
import { LoginComponent } from './login/login.component';
import { ResendActivationEmailComponent } from './resend-activation-email/resend-activation-email.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { RequestForgotPasswordComponent } from './request-forgot-password/request-forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { RegistrasiComponent } from './registrasi/registrasi.component';
import { InputBukuAlamatComponent } from './my-profile/input-buku-alamat/input-buku-alamat.component';
import { SharedModModule } from '../shared-mod/shared-mod.module';
import { DaftarBukuAlamatComponent } from './my-profile/daftar-buku-alamat/daftar-buku-alamat.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModModule
  ],
  declarations: [
    // LoginComponent,
    // AccountActivationComponent,
    // ResendActivationEmailComponent,
    // MyProfileComponent,
    // RequestForgotPasswordComponent,
    // ResetPasswordComponent,
    // UpdatePasswordComponent,
    // InputBukuAlamatComponent,
    // RegistrasiComponent,
    // DaftarBukuAlamatComponent
  ]
})
export class AccountModule { }

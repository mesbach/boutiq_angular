import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountActivationComponent } from './account-activation/account-activation.component';
import { ResendActivationEmailComponent } from './resend-activation-email/resend-activation-email.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { RequestForgotPasswordComponent } from './request-forgot-password/request-forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { InputBukuAlamatComponent } from './my-profile/input-buku-alamat/input-buku-alamat.component';
import { RegistrasiComponent } from './registrasi/registrasi.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "activation/:activation_code", component: AccountActivationComponent},
  {path: "activation", component: AccountActivationComponent},
  {path: "resend_activation_email", component: ResendActivationEmailComponent},
  {path: "profile", component: MyProfileComponent},
  {path: "forgot-password", component: RequestForgotPasswordComponent},
  {path: "reset-password/:token", component: ResetPasswordComponent},
  {path: "update-password", component: UpdatePasswordComponent},
  {path: "alamat/input", component: InputBukuAlamatComponent},
  {path: "alamat/input/:id_alamat", component: InputBukuAlamatComponent},
  {path: "registrasi", component: RegistrasiComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }

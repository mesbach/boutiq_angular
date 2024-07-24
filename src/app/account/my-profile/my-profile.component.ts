import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import swal from "sweetalert2";
import { Title } from '@angular/platform-browser';
import { BaseauthService } from '../../services/baseauth.service';
import { Globals } from '../../global';
import { FileInputService } from '../../services/file-input.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit, OnDestroy {
  baseProfile = {
    telepon: "",
    jenis_kelamin: "",
    tanggal_lahir: "",
    nama_customer: ""
  };
  profile = null;
  hasProfile: boolean = false;
  photo_profile = null;
  new_photo_profile: any = null;

  subLogin: Subscription;
  subProfile: Subscription;
  subFileInput: Subscription;

  constructor(
    public auth: BaseauthService,
    private router: Router,
    public globals: Globals,
    public fis: FileInputService,
    private ttl: Title
  ) {
  }

  ngOnInit() {
    this.ttl.setTitle("Profil Saya - Auliastore");
    // subscribe event check login selesai dilakukan
    this.subLogin = this.auth.loginEvent.subscribe(() => {
      console.log("profile", "receive login event");
      if (this.auth.isLoggedIn == true) {
        console.log("sudah login");
        this.auth.getProfile();
      } else {
        console.log("belum login, redirect ke halaman login");
        this.auth.openLoginPage();
      }
    });

    // subscribe event refresh profile selesai dilakukan
    this.subProfile = this.auth.profileEvent.subscribe((data) => {
      console.log("profile", "receive profile event");
      this.syncProfile();
      if (data.code == "photo") {
        swal("Berhasil", "foto profil berhasil diubah", "success");
        // reset variable new photo profile ke null agar tombol update photo profile disembunyikan
        this.new_photo_profile = null;
      }
    });

    // subscribe ke service yang menghandle input dengan type file
    this.subFileInput = this.fis.fileChanged.subscribe((data: any) => {
      console.log("file changed event received", data);
      // field input dengan code 1 di component ini adalah input untuk foto profil
      if (data.code == '1') {
        // event berisi file yang dipilih oleh user di assign ke variable new photo profile untuk nanti disubmit
        this.new_photo_profile = data.file;
      }
    });

    //request check status login
    this.auth.checkIfLoggedIn();
  }

  ngOnDestroy() {
    console.log("profile", "on destroy");
    // unsubscribe semua
    if (this.subLogin != undefined)
      this.subLogin.unsubscribe();
    if (this.subProfile != undefined)
      this.subProfile.unsubscribe();
    if (this.subFileInput != undefined)
      this.subFileInput.unsubscribe();
  }

  syncProfile() {
    console.log("sync profile", this.auth.myProfile);
    if (this.auth.myProfile != null) {
      this.profile = this.auth.myProfile;
      this.hasProfile = this.profile != null;
      this.photo_profile = this.profile.photo_profile;
    } else {
      this.profile = this.baseProfile;
    }
  }

  updateProfile() {
    let error = "";
    if (this.profile.nama_customer.toString().trim().length == 0) {
      error = "Nama harus diisi";
    } else if (this.profile.telepon.toString().trim().length == 0) {
      error = "Telepon harus diisi";
    }
    if (error.length > 0) {
      swal("Kesalahan", error, "error");
      return;
    }
    this.auth.updateProfile(this.profile)
  }

  updateProfilePhoto() {
    let errMsg = "";
    if (this.new_photo_profile == null) {
      errMsg = "Foto baru tidak valid";
    }
    if (errMsg.length > 0) {
      swal("Kesalahan", errMsg, "error");
      return;
    }
    this.auth.updatePhotoProfile(this.new_photo_profile);
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import swal from "sweetalert2";
import { Title } from '@angular/platform-browser';
import { Globals } from '../../../global';

@Component({
  selector: 'app-input-buku-alamat',
  templateUrl: './input-buku-alamat.component.html',
  styleUrls: ['./input-buku-alamat.component.css']
})
export class InputBukuAlamatComponent implements OnInit {

  list_provinsi = [];
  list_kabupaten = [];
  list_kecamatan = [];
  list_kelurahan = [];

  id_alamat = "";

  alamat = {
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    kelurahan: "",
    nama_alamat: "",
    nama_penerima: "",
    telepon_penerima: "",
    alamat_lengkap: "",
    kode_pos_penerima: ""
  };

  constructor(
    private http: HttpClient,
    public globals: Globals,
    private router: Router,
    private route: ActivatedRoute,
    private ttl: Title
  ) { }

  ngOnInit() {
    this.reqListProvinsi();
    this.id_alamat = this.route.snapshot.paramMap.get("id_alamat");
    console.log("id alamat = ", this.id_alamat);
    if (this.id_alamat != null) {
      this.reqInfoAlamat();
      this.ttl.setTitle("Ubah Alamat - Auliastore");
    } else {
      this.ttl.setTitle("Tambah Alamat - Auliastore");
    }
  }

  reqInfoAlamat() {
    this.http.post(this.globals.apiAlamatCustomer + "get_one",
      {
        where: { id_alamat: this.id_alamat }
      }
    )
      .subscribe(
        (result: any) => {
          if (result != null) {
            this.alamat = result;
            this.reqListKabupaten();
          }
        },
        (err: any) => { }
      );
  }

  reqListProvinsi() {
    this.list_provinsi = [];
    this.http.post(this.globals.apiProvinsi + "get_many", new HttpParams().set("order", JSON.stringify([["id_prov"]])))
      .subscribe((data: any) => {
        this.list_provinsi = data;
      });
  }

  reqListKabupaten() {
    this.list_kabupaten = [];
    this.list_kecamatan = [];
    this.list_kelurahan = [];
    this.http.post(this.globals.apiKabupaten + "get_many",
      new HttpParams()
        .set("where", JSON.stringify({ "_.id_prov": this.alamat.provinsi }))
        .set("order", JSON.stringify([["_.nama"]]))
    )
      .subscribe((data: any) => {
        this.list_kabupaten = data;
        if(this.id_alamat != null){
          this.reqListKecamatan();
        }
      });
  }

  reqListKecamatan() {
    this.list_kecamatan = [];
    this.list_kelurahan = [];
    this.http.post(this.globals.apiKecamatan + "get_many",
      new HttpParams()
        .set("where", JSON.stringify({ "_.id_kab": this.alamat.kabupaten }))
        .set("order", JSON.stringify([["_.nama"]]))
    )
      .subscribe((data: any) => {
        this.list_kecamatan = data;
        if(this.id_alamat != null){
          this.reqListKelurahan();
        }
      });
  }

  reqListKelurahan() {
    this.list_kelurahan = [];
    this.http.post(this.globals.apiKelurahan + "get_many",
      new HttpParams()
        .set("where", JSON.stringify({ "_.id_kec": this.alamat.kecamatan }))
        .set("order", JSON.stringify([["_.nama"]]))
    )
      .subscribe((data: any) => {
        this.list_kelurahan = data;
      });
  }

  simpanAlamat() {
    swal({
      title: "Mohon tunggu",
      text: "Sedang menyimpan data alamat"
    });
    var api = this.id_alamat == null ? "save_json" : "update_json";
    this.http.post(this.globals.apiAlamatCustomer + api, this.alamat)
      .subscribe((data: any) => {
        if (data.status) {
          swal.close();
          this.router.navigate(["account/profile"]);
        } else {
          swal({
            title: "Kesalahan",
            text: data.msg,
            type: "error"
          });
        }
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import swal from 'sweetalert2';
import { Globals } from '../../../global';

@Component({
  selector: 'app-daftar-buku-alamat',
  templateUrl: './daftar-buku-alamat.component.html',
  styleUrls: ['./daftar-buku-alamat.component.css']
})
export class DaftarBukuAlamatComponent implements OnInit {

  listAlamat = [];

  constructor(
    private http: HttpClient,
    public globals: Globals
  ) { }

  ngOnInit() {
    this.reqListAlamat();
  }

  reqListAlamat(){
    this.http.get(this.globals.apiAlamatCustomer + "get_many")
    .subscribe((data:any)=>{
      this.listAlamat = data;
    });
  }

  clickHapusAlamat(alamat){
    swal({
      type:"warning",
      title: "Hapus Alamat",
      // text: "Hapus Alamat <b>" + alamat.nama_alamat + "</b>",
      html: "Hapus Alamat <b>" + alamat.nama_alamat + "</b>",
      // html: true,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return new Promise((resolve) => {
          this.http.post(this.globals.apiAlamatCustomer + "hapus", new HttpParams().set("id", alamat.id_alamat))
          .subscribe(
            (resp: any)=>{
              if(resp.status == undefined){
                swal({
                  type: "error",
                  text: "Respon server tidak dikenal",
                  title: "Kesalahan"
                });
              } else {
                if(resp.status){
                  swal.close();
                  for(var i = 0 , i2 = this.listAlamat.length; i < i2; i++){
                    var alm = this.listAlamat[i];
                    if(alm.id_alamat == alamat.id_alamat){
                      this.listAlamat.splice(i, 1);
                      break;
                    }
                  }
                } else {
                  swal({
                    type: "error",
                    title: "Kesalahan",
                    text: resp.msg
                  });
                }
              }
            },(err:any)=>{
              swal({
                type: "error",
                title: "Kesalahan",
                text: "Terjadi kesalahan di server/jaringan"
              });
            }
          );
        })
      }
    });
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../global';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  knownResource = [];
  no_photo = window.document.location.origin + "/assets/images/no_photo.jpg";

  constructor(
    private http: HttpClient,
    public glb: Globals
  ){
  }

  transform(value: string, args?: any): any {
    return new Observable(observer => {
      if(value == undefined || value == null){
        observer.next(this.no_photo);
        observer.complete();
      } else {
        if(value.indexOf("http://") >= 0 || value.indexOf("https://") >= 0){
          observer.next(value);
          observer.complete();
          // check apakah file tersebut menggunakan protocol head
          // this.http.head(value)
          // .subscribe(
          //   (result: any) => {
          //     console.log("result check resource", result);
          //   },
          //   (err: any) => {
          //     console.log("check resource failed", err);
          //   },
          //   () => {
          //     console.log("check resouce complete");
          //   }
          // );
        }
      }
    });
    
    
  }

}

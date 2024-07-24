import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Pipe({
  name: 'imageProductUrl'
})
export class ImageProductPipePipe implements PipeTransform {

  no_image = window.document.location.origin + "/assets/images/product-no-image.jpg";;

  transform(value: any, args?: any): any {
    return new Observable(observer => {
      if (value == undefined || value == null) {
        observer.next(this.no_image);
        observer.complete();
      } else {
        if (value.indexOf("http://") >= 0 || value.indexOf("https://") >= 0) {
          observer.next(value);
          observer.complete();
        }
      }
    });
  }

}

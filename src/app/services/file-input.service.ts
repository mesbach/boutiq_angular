import { Injectable, Output, EventEmitter } from '@angular/core';
import swal from 'sweetalert2';

@Injectable()
export class FileInputService {

  @Output() fileChanged = new EventEmitter();

  constructor() { }

  inputImageFileChanged(event, code: string, previewElement) {
    console.log("event", event);
    console.log("preview elmnt", previewElement);
    console.log("code", code);
    let file = null;
    if (event.target.files.length > 0) {
      file = event.target.files[0];
    }

    if (file == null) {
      return;
    }

    if (file.type.indexOf("image") < 0) {
      file = null;
      swal("Kesalahan", "Pilih file gambar", "error");
      return;
    }

    if (FileReader && file != null) {
      console.log("target var", code);
      let fr = new FileReader();
      fr.onload = () => {
        previewElement.src = fr.result;
      };
      fr.readAsDataURL(file);

      this.fileChanged.emit({code:code, file:file});
    }
  }

}

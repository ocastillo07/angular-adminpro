import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeImagen'
})
export class ImagenPipe implements PipeTransform {

  transform(image:string): string {
    if (image === '' || image === null || image === undefined){
      return 'https://res.cloudinary.com/cerradas/image/upload/v1622076884/no-image_aemfcw.png';
    } else {
      return image;
    }
  }

}

import { Injectable } from '@angular/core';
import { Storage, ref, list, uploadBytesResumable, getDownloadURL} from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url: string = "";
  constructor(private storage: Storage) { }

  public uploadImage($event: any, name:string){
    const file = $event.target.files[0];
    const imgRef = ref(this.storage, `imagen/` + name)
    uploadBytesResumable(imgRef, file)
    .then(response =>{this.getImages()})
    .catch(error=> console.log(error))
  }

  getImages(){
    const imagesRef = ref(this.storage, 'imagen')
    list(imagesRef)
    .then(async response =>{
      for (let item of response.items){
        this.url = await getDownloadURL(item);
        console.log("la URL es: " + this.url);
      }
    })
    .catch(error=> console.log(error))
  }
}

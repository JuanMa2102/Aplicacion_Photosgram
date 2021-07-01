import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  photo: any;
  constructor() { }

  setPhoto(photo: any){
    this.photo = photo;
  }

  getPhoto(){
    return this.photo;
  }
}

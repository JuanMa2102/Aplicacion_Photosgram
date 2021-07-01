import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'
import { tap } from 'rxjs/operators';

const URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  url=`${URL}/api/post`;
  constructor( private http: HttpClient) { }

  getPhotos(){
    return this.http.get(`${this.url}`)
    .pipe(
      tap(
        (response: any) => {
          console.log(response);
        }
      )
    );
  }
}

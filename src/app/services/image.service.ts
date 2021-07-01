import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';

import { tap } from 'rxjs/operators';

import {environment} from '../../environments/environment'

const URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient
  ) { }

  saveImage(data: FormData) {

    return this.http.post(`${URL}/api/post`, data)
      .pipe(
        tap(
          (response: any) => {
            console.log(response);
          }
        )
      );
  }
}
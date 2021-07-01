import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { promise } from 'protractor';
import { ImageService } from '../services/image.service'
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page{

  postForm = new FormGroup({
    description: new FormControl('', [Validators.required])
  });

  public previsualizacion: string;
  public archivos: any = []

  constructor( 
    private sanitizer: DomSanitizer, 
    private imageService: ImageService, 
    private http: HttpClient, 
    private AuthenticationService: AuthenticationService,
    private router: Router){}

  capturarFile(event): any {
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base
      //console.log(imagen)
    })
    this.archivos.push(archivoCapturado);
    console.log(this.archivos)
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject)=>{
    try{
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustHtml(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    } catch(e){
      return null;
    }
  });

  subirArchivo(): any{
    try{
      //const file = [];

      console.log(this.postForm.value.description);
      console.log(this.AuthenticationService.getCurrentUser());

      const formularioDatos = new FormData();
      this.archivos.forEach(archivo => {
        formularioDatos.append('image', archivo)
      })
      formularioDatos.append('description', this.postForm.value.description)
      formularioDatos.append('username', this.AuthenticationService.getCurrentUser())

      console.log(formularioDatos)
      this.imageService.saveImage(formularioDatos)
      .subscribe(res => {
          console.log('Respuesta del servidor:', res);
      })

      this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });

    }catch(e){
        console.log('Error', e);
    }
  }

}

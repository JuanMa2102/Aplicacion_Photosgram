import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Console } from 'console';
import { AuthenticationService } from '../services/authentication.service';
import { DetailService } from '../services/detail.service';
import { PhotosService } from '../services/photos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  photos: any[];
  contact: Array<Object>;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private photosService: PhotosService,
    private detailService: DetailService
  ) {}

  tabCamara(){
    this.navCtrl.navigateForward('/tabs/tab2');
  }

  ngOnInit(){
    this.photosService.getPhotos().subscribe((data:any) =>{
      console.log(data.data.length);
      console.log(data.data);
      this.photos = data.data;
    });
  }

  openDetail(photo: any){
    this.detailService.setPhoto(photo);
    this.navCtrl.navigateForward('/details');
  }

}

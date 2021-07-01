import { Component, OnInit } from '@angular/core';
import { DetailService } from '../services/detail.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  photo: any;

  constructor( private detailService: DetailService) { }

  ngOnInit() {
      this.photo = this.detailService.getPhoto();
  }

}

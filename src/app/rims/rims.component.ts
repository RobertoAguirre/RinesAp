import { Component,OnInit } from '@angular/core';
import { RimsService } from '../services/rims.service';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-rims',
  templateUrl: './rims.component.html',
  styleUrls: ['./rims.component.css']
})
export class RimsComponent implements OnInit {
  imagesUrl = environment.STATIC_FILES_URL;
  public rims = [];
  currentBrand;

  constructor(private rim: RimsService) {

  }

  ngOnInit(): void {
    this.currentBrand = history.state.data;


    this.rim.getAll().subscribe((response) => {
      let _response;
      _response = response;
      this.rims = _response.results;
      /* alert(_response.results[0].modelname); */
    })
  }
}

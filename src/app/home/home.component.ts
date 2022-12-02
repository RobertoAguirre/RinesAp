import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';
import { RimsService } from '../services/rims.service';
import { BrandsService } from '../services/brands.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imagesUrl = environment.STATIC_FILES_URL;
  public brands = [];
  constructor(public dialog: MatDialog, private brand: BrandsService, private router: Router) {

  }
  ngOnInit(): void {

    this.brand.getAll().subscribe((response) => {
      let _response;
      _response = response;
      this.brands = _response.results;
      /* alert(_response.results[0].modelname); */
    })
  }

  goToRims(brand) {
    this.router.navigate(['/rims'], {
      state: {
        data: {
          brand: brand
        }
      }
    });
  }

  openDialog(comp) {
    const dialogRef = this.dialog.open(ModalComponent, {
      /*       width: '330px',
            height: '400px', */
      data: {
        componentToShow: comp
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

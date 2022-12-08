import { Component, OnInit } from '@angular/core';
import { RimsService } from '../services/rims.service';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../environments/environment';
import { ModalComponent } from '../components/modal/modal.component';
import { BrandsService } from '../services/brands.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-rims',
  templateUrl: './rims.component.html',
  styleUrls: ['./rims.component.css']
})
export class RimsComponent implements OnInit {
  imagesUrl = environment.STATIC_FILES_URL;
  public rims = [];
  currentBrand;

  constructor(private rim: RimsService, public dialog: MatDialog, private brand: BrandsService, private router: Router) {

  }

  ngOnInit(): void {
    this.currentBrand = history.state.data;
    this.getRimsByBrand();


  }

  getRimsByBrand(){
    this.rim.getAll().subscribe((response) => {
      let _response;
      _response = response;
      this.rims = _response.results;
      /* alert(_response.results[0].modelname); */
    })
  }

  deleteRim(rim){
    this.rim.delete(rim).subscribe((response)=>{
      let _response;
      _response = response;
      Swal.fire('Modelo eliminado!', 'xx', 'success')
      this.getRimsByBrand();

    })
    
  }

  printHere(){}

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

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';
import { RimsService } from '../services/rims.service';
import { BrandsService } from '../services/brands.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imagesUrl = environment.STATIC_FILES_URL;
  public brands = [];

  id;
  role;
  username;
  admin;

  constructor(public dialog: MatDialog, private brand: BrandsService, private router: Router) {

  }


  ngOnInit(): void {

    this.getStoredVariables();
    this.getBrands();

  }

  getBrands() {
    this.brand.getAll().subscribe((response) => {
      let _response;
      _response = response;
      this.brands = _response.results;
      /* alert(_response.results[0].modelname); */
    })
  }

  getStoredVariables() {
    this.id = localStorage.getItem('id');
    this.role = localStorage.getItem('role');
    this.username = localStorage.getItem('username');
    if (this.role === 'admin') {
      this.admin = true;
    } else {
      this.admin = false;
    }
  }


  goToRims(brand) {
    localStorage.setItem('currentBrand', brand);
    this.router.navigate(['/rims'], {
      state: {
        data: {
          brand: brand
        }
      }
    });
  }

  goToUsers() {
    //localStorage.setItem('currentBrand',brand);
    this.router.navigate(['/users']);
  }





  deleteBrand(data) {


    Swal.fire({
      title: 'Esta a punto de eliminar una marca, ¿esta seguro?',
      text: 'Esta operación no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar marca',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.brand.delete(data).subscribe((response) => {
          let _response;
          _response = response;
          this.brands = _response.results;
          this.getBrands();
          /* alert(_response.results[0].modelname); */
        });

        Swal.fire(
          'Eliminado!',
          'La marca y sus modelos han sido eliminados.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    })

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
      this.getBrands();
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}

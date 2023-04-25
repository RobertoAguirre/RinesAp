import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BrandsService } from '../services/brands.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newbrand',
  templateUrl: './newbrand.component.html',
  styleUrls: ['./newbrand.component.css'],
})
export class NewbrandComponent {
  fileName = '';
  file;

  constructor(
    public dialog: MatDialog,
    private brand: BrandsService,
    private router: Router
  ) {}

  newbrandForm = new FormGroup({
    brand: new FormControl('', [Validators.required, Validators.minLength(2)]),
    brandlogo: new FormControl('', [Validators.required]),
  });

  onFileSelected(event) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      this.file = file;
      this.newbrandForm.get('brandlogo').setValue(this.file);
    }
  }

  onSubmit() {
    this.brand
      .getOne(this.newbrandForm.value['brand'])
      .subscribe((response) => {
        let _response;
        _response = response;

        if (_response.brands.length <= 0) {
          //let data = this.newrimForm.value;
          const formData = new FormData();
          formData.append('brand', this.newbrandForm.value['brand']);
          formData.append('brandlogo', this.file);

          this.brand.save(formData).subscribe((response) => {
            let _response;
            _response = response;
            Swal.fire(
              '¡Guardado!',
              'La marca se guardó correctamente',
              'success'
            );
            //Swal.close();
            this.dialog.closeAll();
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La marca ya existe',
          });
          this.dialog.closeAll();
        }
      });
  }

  closeDialog(comp) {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });

    dialogRef.close();
  }
}
